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
} = require("../../../controllers/categorieActions");

// Route to get a list of user
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to modify a specific user by ID
router.put("/:id", edit);

// Route to add a new user
router.post("/", add);

// Route to remove a new user by ID
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
