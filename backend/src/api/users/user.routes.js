const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const {postUser, updateUser} = require("../../validators/users.validator");

router.get("/getAllUsers", userController.getAllUsers);
router.post("/postUser", postUser, userController.createUser);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUser/:id", updateUser, userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
