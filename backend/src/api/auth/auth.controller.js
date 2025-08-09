const { prisma } = require("@prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user.id);

    res.json({ message: "Login successful", userId: user.id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email, username } });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already in use" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.user.create({
      data: { email, password: hashedPassword, username },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, register };
