const ProductService = require('../services/productService');

const getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductService.getAllProducts();
        res.json(products);
    } catch (err) {
        next(err);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const productData = req.body;

        if (!productData.name || !productData.description || !productData.price || !productData.stock || !productData.code) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newProduct = await ProductService.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllProducts, createProduct };