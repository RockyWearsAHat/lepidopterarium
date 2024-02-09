//#region Requires
const express = require("express");
const handlebars = require("express-handlebars");
const sequelize = require("./db/sequelizeConn");
const User = require("./models/user");
const session = require("express-session");
const sessionOpts = require("./db/session");
const masterRouter = require("./routes/masterRouter");
require("dotenv").config();
//#endregion
const { Region } = require('./models');

const app = express();

//Make sure to app.use all middlewares before any of the routes to ensure they behave correctly for all routes
//#region Engine/Paths/Parsing/Middlewares

//Set up handlebars
const hbs = handlebars.create({
  layoutsDir: app.get("layouts"),
  partialsDir: app.get("partials")
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", process.cwd() + "/views");

app.set('view engine', 'handlebars');

//Set up static routes for references on pages
app.use("/", express.static("public/images"));
app.use("/", express.static("public/css"));
app.use("/", express.static("public/scripts"));

//Use multipart form encoding and json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set up the session
app.use(session(sessionOpts));

//#endregion

//#region Routes

//Use all API/backend routes defined in ./routes/masterRouter.js
app.use("/", masterRouter);

//View/render routes
app.get("/", (req, res) => {
  if (req.session && req.session.loggedIn == true) console.log("logged in!");
  res.render("landingPage", { layout: "main", loggedIn: req.session.loggedIn });
});


app.get("/login", (req, res) => {
  res.render("login", { layout: "main" });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "main" });
});

app.get("/description", (req, res) => {
  res.render("description", { layout: "main" });
});

app.get("/africa", (req, res) => {
  const data = {
    name: 'Central America',
    filename: '01-blossoming-apricot.jpg',
    description:
      'Central America is home to many bueatiful species of butterfly from around the world! "Awesome Butterflies" is synonamus wiht central america if you are trying to find that perfect pet!',
    butterfly_ids: '[1,2,3]'
  }
  res.render("region", { layout: "main", data: data });
});

app.get("/central", (req, res) => {
  res.render("central", { layout: "default" });
});

app.get("/southamerica", (req, res) => {
  res.render("southamerica", { layout: "default" });
});

app.get("/asia", (req, res) => {
  res.render("asia", { layout: "default" });
});

app.get("/guinea", (req, res) => {
  res.render("guinea", { layout: "default" });
});

app.get("/seasia", (req, res) => {
  res.render("seasia", { layout: "default" });
});


app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("Logged out user");
    res.render("logout", { layout: "main" });
  });
});

app.post("/description", (req, res) => {
  res.render("posted somthing");
});

//#endregion

//Force sync models, NOTE - FORCE: TRUE CAUSES ALL MODELS AND DATA FROM CURRENT DB TO BE WIPED
//remember to reseed data/repost data if necessary, or turn force: false if the models aren't being updated
sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => console.log("App is listening on http://localhost:3000"));
});
