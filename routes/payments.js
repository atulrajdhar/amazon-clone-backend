import express from 'express';

import PaymentsController from '../controllers/payments.js';

const router = require('express-promise-router')();

router.route('/create')
    .post(PaymentsController.createPayment)

export default router;