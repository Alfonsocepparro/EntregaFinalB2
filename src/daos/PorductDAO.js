const Product = require('../models/Product');

class ProductDAO {
    async findById(productId) {
        return await Product.findById(productId);
    }

    async save(product) {
        return await product.save();
    }

    async findAll() {
        return await Product.find();
    }
}

module.exports = new ProductDAO();
