const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const rolesRouter = require("./roles/router");
const abonnementsRouter = require("./abonnements/router");
const usersRouter = require("./users/router");
const categoriesRouter = require("./categories/router");
const souscatsRouter = require("./souscats/router");
const sectionsRouter = require("./sections/router");
const videosRouter = require("./videos/router");
const authRouter = require("./auths/router");

router.use("/roles", rolesRouter);
router.use("/abonnements", abonnementsRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/souscats", souscatsRouter);
router.use("/sections", sectionsRouter);
router.use("/videos", videosRouter);
router.use("/auths", authRouter);

/* ************************************************************************* */

module.exports = router;
