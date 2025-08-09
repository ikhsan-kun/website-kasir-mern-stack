// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config(); 
const authRoutes = require("./api/auth/auth.routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port http://localhost:${PORT}`);
});
