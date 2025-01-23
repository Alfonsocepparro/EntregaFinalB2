const express = require('express');
const router = express.Router();
const { addToCart, purchaseCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/:cid/add', authMiddleware(['user']), addToCart);
router.post('/:cid/purchase', authMiddleware(['user']), purchaseCart);

module.exports = router;