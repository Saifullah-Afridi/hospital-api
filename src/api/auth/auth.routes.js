const express = require("express");

const router = express.Router();

const { login } = require("./auth.controller");
const validateLogin = require("../../middleware/validateLogin");

router.post("/login", validateLogin, login);

module.exports = router;
