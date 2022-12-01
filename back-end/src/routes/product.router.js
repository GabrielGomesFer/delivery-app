const { Router } = require('express');
const productController = require('../controller/product.controller');
const validationToken = require('../middlwares/validationToken.middleware');

const router = Router();

router.get('/', validationToken, productController.getProducts);

module.exports = router;