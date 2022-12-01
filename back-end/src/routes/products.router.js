const { Router } = require('express');
const productController = require('../controller/products.controller');
const validationToken = require('../middlwares/validationToken.middleware');

const router = Router();

router.get('/', validationToken, productController.getProducts);

module.exports = router;