const express = require("express");

const router = express.Router();

const { login, forgotPassword, resetPassword } = require("./auth.controller");
const validateLogin = require("../../middleware/validateLogin");

router.post("/login", validateLogin, login);
router.post("/reset-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

module.exports = router;
