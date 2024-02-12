const router = require("express").Router();
const userLoginRouter = require("./user/masterUserRouter");
const commentRouter = require('./api/masterAPIRoute')

router.use("/api/user", userLoginRouter);
router.use("/api/comments", commentRouter);

module.exports = router;
