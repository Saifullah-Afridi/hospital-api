const express = require("express");
const { authMiddleware } = require("../../middleware/auth.middleware");
const { register } = require("./user.controller");
const router = express.Router();

router.post("/register", authMiddleware, register);

module.exports = router;
