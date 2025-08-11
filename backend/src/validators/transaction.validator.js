const { body } = require("express-validator");

const transactionValidator = {
  createTransaction: [
    body("code")
      .notEmpty()
      .withMessage("Kode transaksi wajib diisi")
      .isString()
      .withMessage("Kode transaksi harus berupa string"),

    body("kasirId")
      .notEmpty()
      .withMessage("Kasir ID wajib diisi")
      .isMongoId()
      .withMessage("Kasir ID harus ObjectId yang valid"),

    body("customerName")
      .optional()
      .isString()
      .withMessage("Nama customer harus berupa string"),

    body("total")
      .notEmpty()
      .withMessage("Total wajib diisi")
      .isFloat({ min: 0 })
      .withMessage("Total harus berupa angka dan tidak boleh negatif"),

    body("paymentMethod")
      .notEmpty()
      .withMessage("Metode pembayaran wajib diisi")
      .isIn(["cash", "qris", "debit", "transfer"])
      .withMessage("Metode pembayaran tidak valid"),

    body("paidAmount")
      .notEmpty()
      .withMessage("Jumlah bayar wajib diisi")
      .isFloat({ min: 0 })
      .withMessage("Jumlah bayar harus berupa angka dan minimal 0"),

    body("change")
      .notEmpty()
      .withMessage("Kembalian wajib diisi")
      .isFloat({ min: 0 })
      .withMessage("Kembalian harus berupa angka dan minimal 0"),
  ],
  updateTransaction: [
    body("code")
      .optional()
      .isString()
      .withMessage("Kode transaksi harus berupa string"),
    body("kasirId")
      .optional()
      .isMongoId()
      .withMessage("Kasir ID harus ObjectId yang valid"),
    body("customerName")
      .optional()
      .isString()
      .withMessage("Nama customer harus berupa string"),
    body("total")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Total harus berupa angka dan tidak boleh negatif"),
    body("paymentMethod")
      .optional()
      .isIn(["cash", "qris", "debit", "transfer"])
      .withMessage("Metode pembayaran tidak valid"),
    body("paidAmount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Jumlah bayar harus berupa angka dan minimal 0"),
    body("change")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Kembalian harus berupa angka dan minimal 0"),
  ],
};

module.exports = { transactionValidator };
