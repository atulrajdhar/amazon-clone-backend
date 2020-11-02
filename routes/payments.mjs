import PaymentsController from '../controllers/payments';

import Router from 'express-promise-router';

const router = Router();

router.route('/')
    .post(PaymentsController.createPayment)

export default router;