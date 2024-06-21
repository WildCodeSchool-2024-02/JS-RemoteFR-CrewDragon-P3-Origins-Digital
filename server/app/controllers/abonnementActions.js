// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all abonnements from the database
    const abonnements = await tables.abonnement.readAll();

    // Respond with the abonnements in JSON format
    res.json(abonnements);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific abonnement from the database based on the provided ID
    const abonnement = await tables.abonnement.read(req.params.id);

    // If the abonnement is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the abonnement in JSON format
    if (abonnement == null) {
      res.sendStatus(404);
    } else {
      res.json(abonnement);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the abonnement data from the request body
  const abonement = req.body;

  try {
    // Insert the abonnement into the database
    const insertId = await tables.abonnement.create(abonement);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted abonnement
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
