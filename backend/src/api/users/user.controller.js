const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const {validationResult} = require('express-validator');

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.User.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  const {username, email} = req.body;
  try {
    const user = await prisma.User.create({
      data: {username, email},
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}

const getUserById = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await prisma.User.findUnique({
      where: {id: parseInt(id)},
    });
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}

const updateUser = async (req, res) => {
  const {id} = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  const {username, email} = req.body;
  try {
    const user = await prisma.User.update({
      where: {id: parseInt(id)},
      data: {username, email},
    });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}

const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await prisma.User.delete({
      where: {id: parseInt(id)},
    });
    return res.status(200).json({message: 'User deleted successfully', user});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal server error'});
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};