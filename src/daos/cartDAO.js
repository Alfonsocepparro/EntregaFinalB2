const Cart = require('../models/Cart');

class CartDAO {
    async findById(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    async save(cart) {
        return await cart.save();
    }
}

module.exports = new CartDAO();
