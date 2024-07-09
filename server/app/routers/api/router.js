const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const rolesRouter = require("./roles/router");

router.use("/roles", rolesRouter);

const abonnementsRouter = require("./abonnements/router");

router.use("/abonnements", abonnementsRouter);

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

const categoriesRouter = require("./categories/router");

router.use("/categories", categoriesRouter);

const souscatsRouter = require("./souscats/router");

router.use("/souscats", souscatsRouter);

const sectionsRouter = require("./sections/router");

router.use("/sections", sectionsRouter);

const videosRouter = require("./videos/router");

router.use("/videos", videosRouter);

const authRouter = require("./auths/router");

router.use("/auths", authRouter);

/* ************************************************************************* */

module.exports = router;
