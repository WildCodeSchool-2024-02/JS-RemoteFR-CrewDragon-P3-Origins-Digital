// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all videos from the database
    const videos = await tables.video.readAll();

    // Respond with the videos in JSON format
    res.json(videos);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific video from the database based on the provided ID
    const video = await tables.video.read(req.params.id);

    // If the video is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the video in JSON format
    if (video == null) {
      res.sendStatus(404);
    } else {
      res.json(video);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const video = { ...req.body, id: req.params.id };

  try {
    // Fetch a specific video from the database based on the provided ID
    await tables.video.update(video);

    // If the video is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the video in JSON format
    if (video == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the video data from the request body

  try {
    // Insert the video into the database
    const insertId = await tables.video.create(req.body);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted video
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Fetch a specific video from the database based on the provided ID
    const video = await tables.video.delete(req.params.id);

    // If the video is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the video in JSON format
    if (video == null) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
