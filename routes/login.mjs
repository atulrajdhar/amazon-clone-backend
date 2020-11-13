import UsersController from '../controllers/users';

import Router from 'express-promise-router';

const router = Router();

router.route('/')
    .post(UsersController.login);

export default router;