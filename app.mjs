// imports
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import users from './routes/users';
import products from './routes/products';
import payments from './routes/payments';
import orders from './routes/orders';

// setup access to environment variables
dotenv.config();

// app config
const app = express();
const port = process.env.PORT;

// middlewares
app.use(bodyParser.json());
app.use(cors());

// api routes
app.get('/', (req, res) => res.status(200).send("hello world"));

app.use('/users', users);
app.use('/products', products);
app.use('/payments', payments);
app.use('/orders', orders);

export default app;