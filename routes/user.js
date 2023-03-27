
const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");

const userController = require("../controller/userController");

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.get("/all-users", userController.getAllUsers);

router.get("/:id", authMiddleware, userController.getUser);

router.delete("/:id", userController.deleteUser);

router.put("/:id", userController.updateUser);

module.exports = router;