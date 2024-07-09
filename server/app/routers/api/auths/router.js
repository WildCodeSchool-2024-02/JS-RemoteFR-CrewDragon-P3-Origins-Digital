const express = require("express");

const router = express.Router();

const { hashPassword } = require("../../../services/auth");
const { login } = require("../../../controllers/authActions");

router.post("/", hashPassword, login);

module.exports = router;
