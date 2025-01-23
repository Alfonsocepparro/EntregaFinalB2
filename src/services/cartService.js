const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');
const calculateTotal = require('../utils/calculateTotal');

const addProductToCart = async (cartId, productId, quantity) => {
    if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('Invalid cart or product ID');
    }

    const cart = await Cart.findById(cartId);
    const product = await Product.findById(productId);

    if (!cart || !product) throw new Error('Cart or product not found');

    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    return cart;
};

const purchaseCart = async (cartId) => {
    const cart = await Cart.findById(cartId).populate('products.product');
    if (!cart) throw new Error('Cart not found');

    let total = 0;
    const unavailableProducts = [];

    for (const item of cart.products) {
        if (item.product.stock >= item.quantity) {
            item.product.stock -= item.quantity;
            total += item.product.price * item.quantity;
            await item.product.save();
        } else {
            unavailableProducts.push(item.product._id);
        }
    }

    const ticket = await Ticket.create({
        amount: total,
        purchaser: cart.user.toString()
    });

    cart.products = cart.products.filter(item => unavailableProducts.includes(item.product._id));
    await cart.save();

    return { ticket, unavailableProducts };
};

module.exports = { addProductToCart, purchaseCart };