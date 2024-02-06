const routeHandler = require("express").Router();
const User = require("../../models/user");
const authGetAPIRoute = require("../validateAuthGetRoute");

routeHandler.get("/", authGetAPIRoute, async (req, res) => {
  //Just a simple route to display all registered users as to not have to log into mysql to check the data was created properly
  try {
    const users = await User.findAll({ raw: true });
    res.json(users);
  } catch (err) {
    res.json(err.message);
  }
});

routeHandler.post("/", async (req, res) => {
  try {
    //Do all validation to ensure that this user is a valid user, throw any errors for try/catch
    if (
      !req.body ||
      !req.body.username ||
      !req.body.password ||
      req.body.username == "" ||
      req.body.password == ""
    )
      throw new Error("Username and password cannot be blank");

    //If inputs are valid, create a user with the spread of the req.body, all user columns are titled the way the
    //body expects them passed in models/user.js so this is the same as saying username: req.body.username,
    //password: req.body.password, etc...
    await User.create({ ...req.body });

    //JSON res OK
    res.json("Registered user successfully!");
  } catch (err) {
    //If any error JSON error
    console.log(err.errors[0].message);
    if (err.message && !err.errors) {
      res.json({ err: err.message });
    } else {
      res.json({ err: err.errors[0].message });
    }
  }
});

module.exports = routeHandler;
