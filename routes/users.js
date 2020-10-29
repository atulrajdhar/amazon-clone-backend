import express from 'express';

import UsersController from '../controllers/users.js';

const router = require('express-promise-router')();

router.route('/')
    .get(UsersController.index)
    .post(UsersController.newUser);

router.route('/:userID')
    .patch(UserController.updateUser)
    .delete(UserController.deleteUser);

export default router;