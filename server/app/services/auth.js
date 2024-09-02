const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables"); // Assurez-vous du chemin correct

// Options de hachage (voir documentation : https://github.com/ranisalt/node-argon2/wiki/Options)
// Recommandations **minimales** de l'OWASP : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10, // 19 Mio en kio (19 * 1024 kio)
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.hashedPassword = hashedPassword;

    // Suppression du mot de passe non haché de la requête par mesure de sécurité
    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    let token = req.get("Authorization");

    if (token) {
      const [type, authToken] = token.split(" ");
      if (type !== "Bearer") {
        throw new Error(
          "Le type de l'en-tête Authorization n'est pas 'Bearer'"
        );
      }
      token = authToken;
    } else {
      token = req.cookies.token;
      if (!token) {
        throw new Error("Le token d'autorisation est manquant");
      }
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const currentUser = (req, res, next) => {
  if (req.auth.userId === +req.params.id) {
    next();
  } else {
    res.status(401).json({ msg: "Vous n'êtes pas autorisé 😡" });
  }
};

const updateAbonnement = async (req, res, next) => {
  const { abonnementsId } = req.body;
  const userId = req.params.id;
  try {
    await tables.user.updateAbonnement(userId, abonnementsId);

    // Générer un nouveau token
    const user = await tables.user.read(userId);
    const token = jwt.sign(
      {
        userId: user.id,
        rolesId: user.roles_id,
        abonnementId: abonnementsId,
      },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    // Stocker le nouveau token dans un cookie
    res.cookie("token", token, {
      httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
      secure: process.env.NODE_ENV === "production", // Envoie le cookie uniquement via HTTPS en production
      maxAge: 3600000, // Expiration du cookie en 1 heure
    });

    // Répondre avec le nouveau token si nécessaire
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  hashPassword,
  verifyToken,
  currentUser,
  updateAbonnement,
};
