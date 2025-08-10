const express = require('express');
const productController = require('./product.controller.js');
const productValidator = require('../../validators/product.validator.js');
const router = express.Router();

router.post('/postProduct', productValidator.createProduct, productController.postProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById/:id', productController.getProductById);
router.put('/updateProduct/:id', productValidator.updateProduct, productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;