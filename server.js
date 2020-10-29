// imports
require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";
const stripe = require('stripe')(process.env.STRIPE_SECRET);

import users from './routes/users.js';
import products from './routes/products.js';
import payments from './routes/payments.js';
import orders from './routes/orders.js';

import mongoOrder from "./models/mongoOrder.js";

// setup gridfs with mongodb
Grid.mongo = mongoose.mongo;

// app config
const app = express();
const port = process.env.PORT; //|| 9000;

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true
  });

// middlewares
app.use(bodyParser.json());
app.use(cors());

// db config
const mongoURI = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.4cjve.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const conn = mongoose.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;

conn.once('open', () => {
    console.log("DB connected");

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('images');
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = `image-${Date.now()}${path.extname(file.originalname)}`

            const fileInfo={
                filename: filename,
                bucketName: 'images'
            }

            resolve(fileInfo);
     })}
});

const upload = multer({ storage });

mongoose.connection.once('open', () => {
    console.log("DB Connected");

    const changeStream = mongoose.connection.collection("orders").watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if(change.operationType === "insert") {
            console.log("Triggering Pusher");

            pusher.trigger("orders", "inserted", {
                change: change
            })
        }
        else {
            console.log("Error triggering Pusher");
        }
    })
});

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.use('/users', users);
app.use('/products', products);
app.use('/payments', payments);
app.use('/orders', orders);

app.post("/upload/image",  upload.single("file"), (req, res) => {
    res.status(201).send(req.file);
});

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    console.log("Payment request recieved for this amount >>> ", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "inr",
    });
    
    // OK - Created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.post("/placeOrder", (req, res) => {
    const dbOrder = req.body;
    
    console.log(dbOrder);

    mongoOrder.create(dbOrder, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });
});

app.get("/retrieveOrders", (req, res) => {
    const userID = req.query.userID;

    console.log(userID);

    mongoOrder.find({"userID": userID}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            data.sort((b, a) => {
                return a.created - b.created;
            });
            res.status(201).send(data);
        }
    });
});

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
