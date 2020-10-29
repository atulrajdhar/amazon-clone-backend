"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _multerGridfsStorage = require("multer-gridfs-storage");

var _multerGridfsStorage2 = _interopRequireDefault(_multerGridfsStorage);

var _gridfsStream = require("gridfs-stream");

var _gridfsStream2 = _interopRequireDefault(_gridfsStream);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _pusher = require("pusher");

var _pusher2 = _interopRequireDefault(_pusher);

var _mongoOrder = require("./models/mongoOrder.js");

var _mongoOrder2 = _interopRequireDefault(_mongoOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
require('dotenv').config();

var stripe = require('stripe')(process.env.STRIPE_SECRET);

// setup gridfs with mongodb
_gridfsStream2.default.mongo = _mongoose2.default.mongo;

// app config
var app = (0, _express2.default)();
var port = process.env.PORT; //|| 9000;

var pusher = new _pusher2.default({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true
});

// middlewares
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

// db config
var mongoURI = "mongodb+srv://admin:" + process.env.DB_PASSWORD + "@cluster0.4cjve.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";

var conn = _mongoose2.default.createConnection(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

_mongoose2.default.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var gfs = void 0;

conn.once('open', function () {
    console.log("DB connected");

    gfs = (0, _gridfsStream2.default)(conn.db, _mongoose2.default.mongo);
    gfs.collection('images');
});

var storage = new _multerGridfsStorage2.default({
    url: mongoURI,
    file: function file(req, _file) {
        return new Promise(function (resolve, reject) {
            var filename = "image-" + Date.now() + _path2.default.extname(_file.originalname);

            var fileInfo = {
                filename: filename,
                bucketName: 'images'
            };

            resolve(fileInfo);
        });
    }
});

var upload = (0, _multer2.default)({ storage: storage });

_mongoose2.default.connection.once('open', function () {
    console.log("DB Connected");

    var changeStream = _mongoose2.default.connection.collection("orders").watch();

    changeStream.on("change", function (change) {
        console.log(change);

        if (change.operationType === "insert") {
            console.log("Triggering Pusher");

            pusher.trigger("orders", "inserted", {
                change: change
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

// api routes
app.get("/", function (req, res) {
    return res.status(200).send("hello world");
});

app.post("/upload/image", upload.single("file"), function (req, res) {
    res.status(201).send(req.file);
});

app.post("/payments/create", async function (req, res) {
    var total = req.query.total;

    console.log("Payment request recieved for this amount >>> ", total);

    var paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "inr"
    });

    // OK - Created
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});

app.post("/placeOrder", function (req, res) {
    var dbOrder = req.body;

    console.log(dbOrder);

    _mongoOrder2.default.create(dbOrder, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/retrieveOrders", function (req, res) {
    var userID = req.query.userID;

    console.log(userID);

    _mongoOrder2.default.find({ "userID": userID }, function (err, data) {
        if (err) {
            res.status(500).send(err);
        } else {
            data.sort(function (b, a) {
                return a.created - b.created;
            });
            res.status(201).send(data);
        }
    });
});

// listener
app.listen(port, function () {
    return console.log("listening on localhost: " + port);
});