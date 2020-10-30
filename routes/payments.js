import PaymentsController from '../controllers/payments.js';

const router = require('express-promise-router')();

router.route('/')
    .post(PaymentsController.createPayment)

export default router;