const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const {
  hashPassword,
  verifyToken,
  currentUser,
} = require("../../../services/auth");

// Import item-related actions

const {
  browse,
  read,
  edit,
  add,
  destroy,
  updateAbonnement,
} = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", verifyToken, currentUser, read);

// Route to update abonnements_id for a specific user by ID
router.put("/:id", edit);

// Route to add a new user
router.post("/", hashPassword, add);

// Route to delete a user by ID
router.delete("/:id", destroy);
// Route pour mettre à jour l'abonnement d'un utilisateur par ID
router.put("/:id/abonnement", updateAbonnement);

module.exports = router;
