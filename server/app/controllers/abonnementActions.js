const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const abonnements = await tables.abonnement.readAll();
    res.json(abonnements);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const abonnement = await tables.abonnement.read(req.params.id);
    if (abonnement == null) {
      res.sendStatus(404);
    } else {
      res.json(abonnement);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const abonnement = req.body;
  try {
    const insertId = await tables.abonnement.create(abonnement);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
};
