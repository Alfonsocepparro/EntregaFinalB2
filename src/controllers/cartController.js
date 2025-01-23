const CartService = require('../services/cartService');

const addToCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const { productId, quantity } = req.body;

        if (!mongoose.Types.ObjectId.isValid(productId) || quantity <= 0) {
            return res.status(400).json({ error: 'Invalid product ID or quantity' });
        }

        const updatedCart = await CartService.addProductToCart(cid, productId, quantity);
        res.json(updatedCart);
    } catch (err) {
        next(err);
    }
};

const purchaseCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const result = await CartService.purchaseCart(cid);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { addToCart, purchaseCart };