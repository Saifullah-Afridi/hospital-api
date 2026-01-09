const express = require("express");
const validateRegister = require("../../middleware/validateRegister");
const { registerUser } = require("./user.controller");
const router = express.Router();

router.post("/register", validateRegister, registerUser);

module.exports = router;
