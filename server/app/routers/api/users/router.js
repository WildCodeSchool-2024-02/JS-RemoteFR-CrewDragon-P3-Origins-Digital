const express = require("express");
const {
  hashPassword,
  verifyToken,
  currentUser,
} = require("../../../services/auth");
const {
  browse,
  read,
  edit,
  add,
  destroy,
  updateAbonnement,
} = require("../../../controllers/userActions");

const router = express.Router();

router.get("/", browse);
router.get("/:id", verifyToken, currentUser, read);
router.put("/:id", edit);
router.post("/", hashPassword, add);
router.delete("/:id", destroy);
router.put("/:id/abonnement", updateAbonnement);

module.exports = router;
