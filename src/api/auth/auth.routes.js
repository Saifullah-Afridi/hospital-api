const express = require("express");

const router = express.Router();

const { RegisterUser } = require("./auth.controller");

router.post("/register", RegisterUser);

module.exports = router;
