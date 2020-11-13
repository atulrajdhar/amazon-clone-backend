import UsersController from '../controllers/users';

import Router from 'express-promise-router';

const router = Router();

router.route('/:userid')
    .get(UsersController.logout);

export default router;