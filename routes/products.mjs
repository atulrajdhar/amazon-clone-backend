import ProductsController from '../controllers/products';

import authUser from '../helpers/basicAuth';

import Router from 'express-promise-router';

const router = Router();

router.route('/')
    .get(ProductsController.index)
    .post(authUser, ProductsController.newProduct);

router.route('/:productID')
//     .patch(ProductsController.updateProduct)
    .delete(ProductsController.deleteProduct);

// router.route('/:productID')
//     .patch(ProductsController.updateProduct)
//     .delete(ProductsController.deleteProduct);

export default router;