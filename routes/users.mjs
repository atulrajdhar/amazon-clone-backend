import UsersController from '../controllers/users';

import Router from 'express-promise-router';

const router = Router();

router.route('/')
    .get(UsersController.index)
    .post(UsersController.newUser);

// router.route('/:userID')
//     .patch(UserController.updateUser)
//     .delete(UserController.deleteUser);

export default router;