const express = require("express");

const router = express.Router();

const { login, forgotPassword } = require("./auth.controller");
const validateLogin = require("../../middleware/validateLogin");

router.post("/login", validateLogin, login);
router.post("/reset-password", forgotPassword);

module.exports = router;
