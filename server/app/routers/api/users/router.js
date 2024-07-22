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

// Importer les actions liées aux utilisateurs
const {
  browse,
  read,
  edit,
  add,
  destroy,
  updateAbonnement,
} = require("../../../controllers/userActions");

// Route pour obtenir une liste d'utilisateurs
router.get("/", browse);

// Route pour obtenir un utilisateur spécifique par ID
router.get("/:id", verifyToken, currentUser, read);

// Route pour mettre à jour l'abonnement d'un utilisateur par ID
router.put("/:id", edit);

// Route pour ajouter un nouvel utilisateur
router.post("/", hashPassword, add);

// Route pour supprimer un utilisateur par ID
router.delete("/:id", destroy);

// Route pour mettre à jour l'abonnement d'un utilisateur par ID
router.put("/:id/abonnement", updateAbonnement);

module.exports = router;
