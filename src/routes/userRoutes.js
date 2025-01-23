const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/current', authMiddleware(['user', 'admin']), getCurrentUser);

module.exports = router;