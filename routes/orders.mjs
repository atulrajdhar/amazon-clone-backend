import OrdersController from '../controllers/orders';

// const router = express.Router();
import Router from 'express-promise-router';

const router = Router();

router.route('/')
    .get(OrdersController.index)
    .post(OrdersController.placeOrder);

export default router;