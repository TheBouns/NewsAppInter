const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/register", UserController.createUser);
router.get("/login", UserController.login);

module.exports = router;
