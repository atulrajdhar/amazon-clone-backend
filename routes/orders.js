import OrdersController from '../controllers/orders.js';

// const router = express.Router();
const router = require('express-promise-router')();

router.route('/')
    .get(OrdersController.index)
    .post(OrdersController.placeOrder);

export default router;