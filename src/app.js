const express = require('express');
const logger = require('./utils/logger');
const connectDB = require('./config/db');
const { port } = require('./config/env');
const app = express();

connectDB();
app.use(express.json());


app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/carts', require('./routes/cartRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(require('./middlewares/errorMiddleware'));

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});
