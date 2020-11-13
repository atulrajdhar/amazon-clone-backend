import AdminUserController from '../../controllers/admin/users';

import Router from 'express-promise-router';

const router = Router();

router.route('/')
    .get(AdminUserController.index)
    .post(AdminUserController.newUser);

 router.route('/:userID')
    .get(AdminUserController.getUser);
//     .patch(UserController.updateUser)
//     .delete(UserController.deleteUser);

export default router;