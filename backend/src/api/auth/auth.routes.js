const express = require('express');
const Authcont = require('./auth.controller.js');
const router = express.Router();
const {loginValidator, registerValidator} = require('../../validators/auth.validator.js'); 

router.post('/register', registerValidator, Authcont.register);
router.post('/login', loginValidator, Authcont.login);

module.exports = router;