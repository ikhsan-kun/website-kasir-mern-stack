const express = require("express");
const authController = require("./auth.controller");
const authValidator = require("../../validators/auth.validator");

const router = express.Router();

router.post("/login", authValidator.login, authController.login);
router.post("/register", authValidator.register, authController.register);
router.post("/verify-email", authValidator.verifyEmail, authController.verifyEmail);
router.get("/token-verification", authController.tokenVerification);

module.exports = router;
