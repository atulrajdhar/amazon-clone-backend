'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users = require('./routes/users.js');

var _users2 = _interopRequireDefault(_users);

var _products = require('./routes/products.js');

var _products2 = _interopRequireDefault(_products);

var _payments = require('./routes/payments.js');

var _payments2 = _interopRequireDefault(_payments);

var _orders = require('./routes/orders.js');

var _orders2 = _interopRequireDefault(_orders);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// imports
require('dotenv-expand')(require('dotenv').config());
require('./config/db.js'); // db config

// app config
var app = (0, _express2.default)();
var port = process.env.PORT;

// middlewares
app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());

// api routes
app.get("/", function (req, res) {
  return res.status(200).send("hello world");
});

app.use('/users', _users2.default);
app.use('/products', _products2.default);
app.use('/payments', _payments2.default);
app.use('/orders', _orders2.default);

// listener
app.listen(port, function () {
  return console.log('listening on localhost: ' + port);
});