const { Router } = require('express');
const loginController = require('../controller/login.controller');

const router = Router();

router.post('/', loginController.login);

module.exports = router;