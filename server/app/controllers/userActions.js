const jwt = require("jsonwebtoken");
const UserRepository = require("../../database/models/UserRepository"); // Assurez-vous du chemin correct

const userRepo = new UserRepository();

const browse = async (req, res, next) => {
  try {
    const users = await userRepo.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await userRepo.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = { ...req.body, id: req.params.id };
  try {
    await userRepo.update(user);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await userRepo.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    await userRepo.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const updateAbonnement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { abonnementsid } = req.body;

    // Mettre à jour l'abonnement de l'utilisateur dans la base de données
    await userRepo.updateAbonnement(userId, abonnementsid);

    // Récupération de l'utilisateur mis à jour pour générer un nouveau token
    const user = await userRepo.read(userId);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Génération d'un nouveau token avec les informations mises à jour
    const newToken = jwt.sign(
      {
        userId: user.id,
        rolesId: user.rolesId,
        abonnementId: user.abonnementsid,
      },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token: newToken }); // Assurez-vous de retourner la réponse ici
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'abonnement :", error);
    return res
      .status(500)
      .json({ msg: "Erreur serveur lors de la mise à jour de l'abonnement" });
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  updateAbonnement,
};
