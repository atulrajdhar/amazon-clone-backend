"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderModel = _mongoose2.default.Schema({
    userID: String,
    paymentIntentID: String,
    basket: [{
        id: Number,
        title: String,
        price: Number,
        image: String
    }],
    amount: Number,
    created: String
});

exports.default = _mongoose2.default.model("orders", orderModel);