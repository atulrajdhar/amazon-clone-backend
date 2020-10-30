//import upload from './config/storage.js';

import Product from '../models/product.js';

export default {
    index: async (req, res) => {
        const products = await Product.find();        
        // products.sort((b, a) => {
        //     return a.created - b.created;
        // });
        res.status(200).json(products);
    },

    newProduct: async (req, res) => {
        const product = new Product(req.body);        
        await product.save();
        res.status(201).json(product);
    }

    // app.post("/upload/image",  upload.single("file"), (req, res) => {
    //     res.status(201).send(req.file);
    // });

};