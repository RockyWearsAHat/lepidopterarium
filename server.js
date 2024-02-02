const express = require("express");
const handlebars = require("express-handlebars");
const sequelize = require("./db/sequelizeConn");
const User = require("./models/user");

const app = express();

//Set up handlebars
const hbs = handlebars.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("layouts", process.cwd() + "/views/layouts");
app.set("partials", process.cwd() + "/views/partials");

//Set up static routes for references on pages
app.use("/", express.static("public/images"));
app.use("/", express.static("public/css"));
app.use("/", express.static("public/scripts"));

//Use multipart form encoding and json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("homepage", { layout: "default" });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "default" });
});

app.post("/api/user/register", async (req, res) => {
  try {
    //Do all validation to ensure that this user is a valid user, throw any errors for try/catch
    if (!req.body || !req.body.username || !req.body.password || req.body.username == "" || req.body.password == "")
      throw new Error("Username and password cannot be blank");

    //If inputs are valid, create a user with the spread of the req.body, all user columns are titled the way the
    //body expects them passed in models/user.js so this is the same as saying username: req.body.username,
    //password: req.body.password, etc...
    await User.create({ ...req.body });

    //JSON res OK
    res.json("Registered user successfully!");
  } catch (err) {
    //If any error JSON error
    res.json(err.message);
  }
});

app.get("/api/user/register", async (req, res) => {
  //Just a simple route to display all registered users as to not have to log into mysql to check the data was created properly
  try {
    const users = await User.findAll({ raw: true });
    res.json(users);
  } catch (err) {
    res.json(err.message);
  }
});

app.post("/api/user/login", async (req, res) => {
  try {
    //Again ensure that all passed parameters are valid
    if (!req.body || !req.body.username || !req.body.password || req.body.username == "" || req.body.password == "")
      throw new Error("Username and password cannot be blank");

    //Create a variable to store the found user in
    let foundUser;
    //If the passed username matches the regex email pattern (I have absolutley no idea how this pattern actually internally works I just found it on github and did some slight mods to make it work)
    //Matches if email is like email@somedomain.co, in that case check the passed username against the stored user emails for a match
    if (
      req.body.username.match(
        /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      )
    ) {
      //If username is email, find a user where the email is whatever was passed to the username, if there is one
      foundUser = await User.findOne({ where: { email: req.body.username } });
    } else {
      //Otherwise, just try to find a user where the username is the passed username
      foundUser = await User.findOne({ where: { username: req.body.username } });
    }
    //If no user was found, throw an error, caught by try catch block
    if (!foundUser) throw new Error(`Unable to find user with username ${req.body.username}`);

    //Otherwise, try to validate the password with the passed password on the body, and if the validation is good, return the user logged in, this logic needs to be expanded but for now works
    if (await foundUser.validatePassword(req.body.password)) return res.json("Logged in user!");

    //Otherwise just res json to try again, if the passwords match this won't be hit because of the return before res.json()
    res.json("Try again!");
  } catch (err) {
    //If error, res.json the error
    res.json(err.message);
  }
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "default" });
});

//Force sync the models, probably not the best way to do so but works for quick development, just wipes all user data and all of the data from the dbs, so
//if you keep force: true as true just be aware on each change of the server.js file because it's running off nodemon, your server will reload and the db
//will be wiped, not a big deal if you remember to reseed it every time, but just know the db gets removed every server reload with this option, and with
//nodemon the server reloads often.
sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => console.log("App is listening on http://localhost:3000"));
});
