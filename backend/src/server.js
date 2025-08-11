require("dotenv").config(); 
const express = require("express");
const cors = require("cors");


// Import routes
const authRoutes = require("./api/auth/auth.routes.js");
const productRoutes = require("./api/products/product.routes.js");
const transactionRoutes = require("./api/transaction/transaction.routes.js");
const transactionItemRoutes = require("./api/transactionItem/transactionItem.routes.js");
const userRoutes = require("./api/users/user.routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/transactionItems", transactionItemRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
