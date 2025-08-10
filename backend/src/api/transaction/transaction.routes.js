const express = require("express");
const transactionController = require("./transaction.controller");
const transactionValidator = require("../../validators/transaction.validator");

const router = express.Router();

router.post(
  "/postTransaction",
  transactionValidator.validateTransaction,
  transactionController.postTransaction
);
router.get("/getAllTransactions", transactionController.getAllTransactions);
router.get("/getTransactionById/:id", transactionController.getTransactionById);
router.put(
  "/updateTransaction/:id",
  transactionValidator.validateTransaction,
  transactionController.updateTransaction
);
router.delete("/deleteTransaction/:id", transactionController.deleteTransaction);

module.exports = router;
