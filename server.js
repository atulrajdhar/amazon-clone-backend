// imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";
const stripe = require('stripe')("sk_test_51HOowFDKfvO7036WKIsiOlWzZgeWmlGH2CBQ5XPx6am8pxN1A5CmLaQ8GyNZ3ECQ7gVsuEWMkBDC6YKeQBVJpG0Z00ldgNFEwK");

import mongoOrder from "./mongoOrder.js";

// setup gridfs with mongodb
Grid.mongo = mongoose.mongo;

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(bodyParser.json());
app.use(cors());

// db config
const mongoURI = "mongodb+srv://admin:ijkqvy7mckg3iah6@cluster0.4cjve.mongodb.net/amazonDB?retryWrites=true&w=majority";

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
});

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

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
    })
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
})

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));