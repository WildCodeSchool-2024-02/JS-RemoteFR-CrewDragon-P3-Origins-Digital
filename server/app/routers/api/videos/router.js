const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/videoActions");

// Route to get a list of videos
router.get("/", browse);

// Route to get a specific video by ID
router.get("/:id", read);

// Route to modify a specific video by ID
router.put("/:id", edit);

// Route to add a new video
router.post("/", add);

// Route to remove a new video by ID
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
