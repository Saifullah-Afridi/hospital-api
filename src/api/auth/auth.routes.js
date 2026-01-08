const express = require("express");

const router = express.Router();

const { RegisterUser } = require("./auth.controller");
const validateRegister = require("../../middleware/validateRegister");

router.post("/register", validateRegister, RegisterUser);

module.exports = router;
