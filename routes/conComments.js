const routeHandler = require("express").Router();
const commentary = "../../models/Comments";

routeHandlers.get('/:commentary', async (req, res) => {
    try {
const commentary = await commentary.findAll({ raw: true, where: {comments:req.query.comments}});
if (commentary == null||!commentary||commentary == undefined) throw new Error ("No comment made");
res.json(butterfly);
} catch (error) {
  return res.status(500).json({ error: error.message });
}
}); 
  

module.exports = routeHandler;