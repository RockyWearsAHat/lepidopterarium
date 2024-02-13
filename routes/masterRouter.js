const router = require("express").Router();
const userLoginRouter = require("./user/masterUserRouter");
const commentRouter = require("./api/masterAPIRoute");
const seedRouter = require("./api/seedTables");

router.use("/api/user", userLoginRouter);
router.use("/api/comments", commentRouter);
router.use("/api/seed", seedRouter);

module.exports = router;
