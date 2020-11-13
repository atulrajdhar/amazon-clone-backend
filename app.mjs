// imports
import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import users from './routes/admin/users';
import products from './routes/products';
import payments from './routes/payments';
import orders from './routes/orders';

import login from './routes/login';
import logout from './routes/logout';
import signup from './routes/signup';

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

app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);

export default app;