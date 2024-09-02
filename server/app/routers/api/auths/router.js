const express = require("express");

const router = express.Router();

const { login, logout } = require("../../../controllers/authActions");

router.post("/", login);
router.post("/logout", logout); // Route pour la déconnexion

module.exports = router;
