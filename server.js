// imports
require('dotenv-expand')(require('dotenv').config());
require('./config/db.js'); // db config

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import users from './routes/users.js';
import products from './routes/products.js';
import payments from './routes/payments.js';
import orders from './routes/orders.js';

// app config
const app = express();
const port = process.env.PORT;

// middlewares
app.use(bodyParser.json());
app.use(cors());

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.use('/users', users);
app.use('/products', products);
app.use('/payments', payments);
app.use('/orders', orders);

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
