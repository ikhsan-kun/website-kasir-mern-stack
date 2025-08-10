const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");

const postTransactionItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "error validation",
      errors: errors.array(),
    });
  }
  
  const { transactionId, productId, quantity } = req.body;
  
  try {
    const newTransactionItem = await prisma.transactionItem.create({
      data: {
        transactionId,
        productId,
        quantity,
      },
    });
    
    return res.status(201).json({
      message: "Transaction item created successfully",
      transactionItem: newTransactionItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getAllTransactionItems = async (req, res) => {
  try {
    const transactionItems = await prisma.transactionItem.findMany();
    return res.status(200).json(transactionItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

const getTransactionItemById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const transactionItem = await prisma.transactionItem.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!transactionItem) {
      return res.status(404).json({ message: "Transaction item not found" });
    }
    
    return res.status(200).json(transactionItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const updateTransactionItem = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "error validation",
      errors: errors.array(),
    });
  }

  const { transactionId, productId, quantity } = req.body;

  try {
    const updatedTransactionItem = await prisma.transactionItem.update({
      where: { id: parseInt(id) },
      data: {
        transactionId,
        productId,
        quantity,
      },
    });

    return res.status(200).json({
      message: "Transaction item updated successfully",
      transactionItem: updatedTransactionItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
const deleteTransactionItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransactionItem = await prisma.transactionItem.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      message: "Transaction item deleted successfully",
      transactionItem: deletedTransactionItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  postTransactionItem,
  getAllTransactionItems,
  getTransactionItemById,
  updateTransactionItem,
  deleteTransactionItem,
};