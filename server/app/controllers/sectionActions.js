// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all sections from the database
    const sections = await tables.section.readAll();

    // Respond with the sections in JSON format
    res.json(sections);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific section from the database based on the provided ID
    const section = await tables.section.read(req.params.id);

    // If the section is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the section in JSON format
    if (section == null) {
      res.sendStatus(404);
    } else {
      res.json(section);
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
  // Extract the section data from the request body
  const section = req.body;

  try {
    // Insert the section into the database
    const insertId = await tables.section.create(section);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted section
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
