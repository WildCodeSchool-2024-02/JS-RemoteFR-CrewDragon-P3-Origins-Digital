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

module.exports = {
  login,
  add,
};
