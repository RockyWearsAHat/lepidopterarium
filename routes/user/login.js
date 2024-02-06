const routeHandler = require("express").Router();
const User = require("../../models/user");
const isEmail = require("../../db/helpers/checkIfEmail");

routeHandler.post("/", async (req, res) => {
  try {
    //Again ensure that all passed parameters are valid
    if (
      !req.body ||
      !req.body.username ||
      !req.body.password ||
      req.body.username == "" ||
      req.body.password == ""
    )
      throw new Error("Username and password cannot be blank");

    //Create a variable to store the found user in
    let foundUser;
    //If the passed username matches the regex email pattern (I have absolutley no idea how this pattern actually internally works I just found it on github and did some slight mods to make it work)
    //Matches if email is like email@somedomain.co, in that case check the passed username against the stored user emails for a match
    if (isEmail(req.body.username)) {
      //If username is email, find a user where the email is whatever was passed to the username, if there is one
      foundUser = await User.findOne({ where: { email: req.body.username } });
    } else {
      //Otherwise, just try to find a user where the username is the passed username
      foundUser = await User.findOne({ where: { username: req.body.username } });
    }
    //If no user was found, throw an error, caught by try catch block
    if (!foundUser) throw new Error(`Unable to find user with username ${req.body.username}`);

    //Otherwise, try to validate the password with the passed password on the body, and if the validation is good, return the user logged in, this logic needs to be expanded but for now works
    if (await foundUser.validatePassword(req.body.password)) {
      await req.session.save(() => {
        req.session.loggedIn = true;
        res.json("Logged in user!");
      });
      return;
    }

    //Otherwise just res json to try again, if the passwords match this won't be hit because of the return before res.json()
    throw new Error("Unable to login user");
  } catch (err) {
    //If error, res.json the error
    res.json(err.message);
  }
});

module.exports = routeHandler;
