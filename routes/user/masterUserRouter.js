const loginRoute = require("./login");
const registerRoute = require("./register");
const checkRoute = require("./checkIfExists");

const router = require("express").Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);
router.use("/check", checkRoute);

module.exports = router;
