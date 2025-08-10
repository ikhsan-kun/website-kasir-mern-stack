const {body} = require('express-validator');

const productValidator = {
  createProduct: [
    body('name')
      .notEmpty()
      .withMessage('Nama produk wajib diisi')
      .isLength({min: 3})
      .withMessage('Nama produk minimal 3 karakter'),
    body('price')
      .notEmpty()
      .withMessage('Harga produk wajib diisi')
      .isNumeric()
      .withMessage('Harga produk harus berupa angka'),
    body('stock')
      .notEmpty()
      .withMessage('Stok produk wajib diisi')
      .isNumeric()
      .withMessage('Stok produk harus berupa angka'),
    body('category')
      .notEmpty()
      .withMessage('Kategori produk wajib diisi')
      .isLength({min: 3})
      .withMessage('Kategori produk minimal 3 karakter'),
  ],
  updateProduct: [
    body('name')
      .optional()
      .isLength({min: 3})
      .withMessage('Nama produk minimal 3 karakter'),
    body('price')
      .optional()
      .isNumeric()
      .withMessage('Harga produk harus berupa angka'),
    body('stock')
      .optional()
      .isNumeric()
      .withMessage('Stok produk harus berupa angka'),
    body('category')
      .optional()
      .isLength({min: 3})
      .withMessage('Kategori produk minimal 3 karakter'),
  ],
};  

module.exports = productValidator;