const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', getAllProducts);
router.post('/', authMiddleware(['admin']), createProduct);

module.exports = router;