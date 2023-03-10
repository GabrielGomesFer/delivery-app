require('express-async-errors');
const cors = require('cors');
const express = require('express');
const loginRouter = require('../routes/login.router');
const userRouter = require('../routes/user.router');
const productRouter = require('../routes/product.router');
const saleRouter = require('../routes/sale.router');
const errorMiddleware = require('../middlwares/error.middleware');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/sales', saleRouter);

app.use(errorMiddleware);

module.exports = app;
