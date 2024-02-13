const { Region, Lepo, User, Comments } = require("../../models");

const router = require("express").Router();

const createRegionEntries = async (data) => {
  await Region.bulkCreate(data);
};

const createLepoEntries = async (data) => {
  await Lepo.bulkCreate(data);
};

const createUserEntries = async (data) => {
  for (let i = 0; i < data.length; i++) {
    await User.create(data[i]);
  }
};

const createUserComments = async (data) => {
  await Comments.bulkCreate(data);
};

router.post("/", async (req, res) => {
  console.log(req.body.table);

  switch (req.body.table) {
    case "region":
      await createRegionEntries(req.body.content);
      break;
    case "lepo":
      await createLepoEntries(req.body.content);
      break;
    case "user":
      await createUserEntries(req.body.content);
      break;
    case "comments":
      await createUserComments(req.body.content);
      break;
    default:
      res.json({ error: "invalid table" });
      return;
  }

  res.json({ success: true });
});

module.exports = router;
