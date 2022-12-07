const { Router } = require('express');
const saleController = require('../controller/sale.controller');
const verifyProducts = require('../middlwares/validationProducts.middleware');
const verifySeller = require('../middlwares/validationSeller.middleware');
const validationToken = require('../middlwares/validationToken.middleware');

const router = Router();

router.post('/', validationToken, verifyProducts, verifySeller, saleController.saleRegister);

router.get('/', validationToken, saleController.getSales);

router.get('/:id', validationToken, saleController.getSales);

router.put('/:id', validationToken, saleController.updateSaleStatus);

module.exports = router;