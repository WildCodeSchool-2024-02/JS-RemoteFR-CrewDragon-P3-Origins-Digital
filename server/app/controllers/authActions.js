const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmailWithPassword(req.body.email);
    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      delete user.hashed_password;
      const token = jwt.sign(
        {
          userId: user.id,
          rolesId: user.roles_id,
          abonnementId: user.abonnementsid,
        },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      // Stocker le token dans un cookie
      res.cookie("token", token, {
        httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
        secure: process.env.NODE_ENV === "production", // Envoie le cookie uniquement via HTTPS en production
        maxAge: 3600000, // Expiration du cookie en 1 heure
      });

      res.json({ token, user });
    } else {
      res.sendStatus(420);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

module.exports = {
  login,
  add,
  logout,
};
