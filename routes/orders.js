import express from 'express';

import OrdersController from '../controllers/orders.js';

// const router = express.Router();
const router = require('express-promise-router')();

router.route('/')
    .get(OrdersController.index)
    .post(OrdersController.newOrder);

router.route('/:orderID')
    .patch(OrdersController.updateOrder)
    .delete(OrdersController.cancelOrder);

export default router;