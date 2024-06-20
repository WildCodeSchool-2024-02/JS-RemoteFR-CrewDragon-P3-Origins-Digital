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

/* ************************************************************************* */

module.exports = router;
