const { body } = require("express-validator");

const postUser = [
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
];

const updateUser = [
  body("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Username minimal 3 karakter"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
  body("email").optional().isEmail().withMessage("Email tidak valid"),
];

module.exports = {
  postUser,
  updateUser,
}
