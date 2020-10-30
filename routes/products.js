import ProductsController from '../controllers/products.js';

const router = require('express-promise-router')();

router.route('/')
    .get(ProductsController.index)
    .post(ProductsController.newProduct);

// router.route('/:productID')
//     .patch(ProductsController.updateProduct)
//     .delete(ProductsController.deleteProduct);

export default router;