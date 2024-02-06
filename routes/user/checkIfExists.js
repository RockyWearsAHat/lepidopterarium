const router = require("express").Router();
const User = require("../../models/user");

router.get("/", async (req, res) => {
  try {
    const type = req.query.type;
    const val = req.query.val;

    if (type != "email" && type != "username") throw new Error("Please check with a valid type");

    let findRes;
    if (type == "email") findRes = await User.findOne({ where: { email: val } });
    else findRes = await User.findOne({ where: { username: val } });

    if (findRes) throw new Error(`User exists with ${req.query.type} ${req.query.val}`);

    res.json("Valid");
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
