const loginRoute = require("./login");
const registerRoute = require("./register");

const router = require("express").Router();

router.use("/login", loginRoute);
router.use("/register", registerRoute);

module.exports = router;
