const { body } = require("express-validator");

const transactionItemValidator = {
  createTransactionItem: [
  body("transactionId")
    .notEmpty().withMessage("Transaction ID wajib diisi")
    .isMongoId().withMessage("Transaction ID harus ObjectId yang valid"),

  body("productId")
    .notEmpty().withMessage("Product ID wajib diisi")
    .isMongoId().withMessage("Product ID harus ObjectId yang valid"),

  body("quantity")
    .notEmpty().withMessage("Quantity wajib diisi")
    .isInt({ min: 1 }).withMessage("Quantity harus minimal 1"),

  body("price")
    .notEmpty().withMessage("Harga wajib diisi")
    .isFloat({ min: 0 }).withMessage("Harga harus angka dan minimal 0"),

  body("subtotal")
    .optional() // akan dihitung ulang di server
    .isFloat({ min: 0 }).withMessage("Subtotal harus angka dan minimal 0"),
],
  updateTransactionItem: [
    body("transactionId")
      .optional()
      .isMongoId()
      .withMessage("Transaction ID harus ObjectId yang valid"),
    body("productId")
      .optional()
      .isMongoId()
      .withMessage("Product ID harus ObjectId yang valid"),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity harus minimal 1"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Harga harus angka dan minimal 0"),
    body("subtotal")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Subtotal harus angka dan minimal 0"),
  ],
};

module.exports = transactionItemValidator;