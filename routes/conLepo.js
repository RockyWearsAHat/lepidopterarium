const routeHandler = require("express").Router();
const Lepo = "../../models/Lepo";

routeHandler.get("/:Name", async (req, res) => {
  try {
    const butterfly = await Lepo.findOne({ raw: true, where: { Name: req.query.Name } });
    if (butterfly == null || !butterfly || butterfly == undefined) throw new Error("Not in Database!");
    res.json(butterfly);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = routeHandler;


