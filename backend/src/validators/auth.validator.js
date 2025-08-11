const { body } = require("express-validator");
const { post } = require("../api/users/user.routes");
const { updateUser } = require("../api/users/user.controller");

const userValidator = {
  login: [
    body("username")
      .notEmpty()
      .withMessage("Username wajib diisi")
      .isLength({ min: 3 })
      .withMessage("Username minimal 3 karakter"),
    body("password")
      .notEmpty()
      .withMessage("Password wajib diisi")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter"),
  ],
  register: [
    body("username")
      .notEmpty()
      .withMessage("Username wajib diisi")
      .isLength({ min: 3 })
      .withMessage("Username minimal 3 karakter"),
    body("password")
      .notEmpty()
      .withMessage("Password wajib diisi")
      .isLength({ min: 8 })
      .withMessage("Password minimal 8 karakter"),
    body("email")
      .isEmail()
      .withMessage("Email tidak valid")
      .notEmpty()
      .withMessage("Email wajib diisi"),
  ],
  verifyEmail: [
    body("email")
      .isEmail()
      .withMessage("Email tidak valid")
      .notEmpty()
      .withMessage("Email wajib diisi"),
  ],
};

module.exports = userValidator;
