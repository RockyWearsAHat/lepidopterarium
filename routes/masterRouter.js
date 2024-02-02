const router = require("express").Router();
const userLoginRouter = require("./user/masterUserRouter");

router.use("/api/user", userLoginRouter);

module.exports = router;
