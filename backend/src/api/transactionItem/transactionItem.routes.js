const express = require("express");
const transactionItemController = require("./transactionItem.controller.js");
const transactionItemValidator = require("../../validators/transactionItem.validator.js");

const router = express.Router();

router.post(
  "/postTransactionItem",
  transactionItemValidator.validateTransactionItem,
  transactionItemController.postTransactionItem
);
router.get("/getAllTransactionItems", transactionItemController.getAllTransactionItems);
router.get("/getTransactionItemById/:id", transactionItemController.getTransactionItemById);
router.put(
  "/updateTransactionItem/:id",
  transactionItemValidator.validateTransactionItem,
  transactionItemController.updateTransactionItem
);
router.delete("/deleteTransactionItem/:id", transactionItemController.deleteTransactionItem);

module.exports = router;
