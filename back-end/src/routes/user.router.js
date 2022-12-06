const { Router } = require('express');
const userController = require('../controller/user.controller');
const validationToken = require('../middlwares/validationToken.middleware');

const router = Router();

router.post('/register', validationToken, userController.register);
router.get('/search', validationToken, userController.getUsersByRole);

module.exports = router;