const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import accès aux tables de base de données
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
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
      // Répondez avec l'utilisateur et un token signé au format JSON (mais sans le mot de passe haché)
      delete user.hashed_password;

      const token = await jwt.sign(
        {
          userId: user.id,
          rolesId: user.roles_id,
          abonnementId: user.abonnementsid,
        }, // Utilisez abonnementId ici
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        token,
        user,
      });
    } else {
      res.sendStatus(420);
    }
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

const add = async (req, res, next) => {
  // Extraire les données utilisateur du corps de la requête
  const user = req.body;

  try {
    // Insérer l'utilisateur dans la base de données
    const insertId = await tables.user.create(user);

    // Répondre avec le statut HTTP 201 (Créé) et l'ID de l'utilisateur nouvellement inséré
    res.status(201).json({ insertId });
  } catch (err) {
    // Passer les erreurs éventuelles au middleware de gestion des erreurs
    next(err);
  }
};

module.exports = {
  login,
  add,
};
