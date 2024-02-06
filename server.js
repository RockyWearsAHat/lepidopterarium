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

const app = express();

//Make sure to app.use all middlewares before any of the routes to ensure they behave correctly for all routes
//#region Engine/Paths/Parsing/Middlewares

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

//Set up the session
app.use(session(sessionOpts));

//#endregion

//#region Routes

//Use all API/backend routes defined in ./routes/masterRouter.js
app.use("/", masterRouter);

//View/render routes
app.get("/", (req, res) => {
  if (req.session && req.session.loggedIn == true) console.log("logged in!");
  res.render("landingPage", { layout: "default", loggedIn: req.session.loggedIn });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "default" });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "default" });
});

app.get("/description", (req, res) => {
  res.render("description", { layout: "default" });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("Logged out user");
    res.render("logout", { layout: "default" });
  });
});

app.post("/description", (req,res)=>{
  res.send("posted somthing")
})

//#endregion

//Force sync models, NOTE - FORCE: TRUE CAUSES ALL MODELS AND DATA FROM CURRENT DB TO BE WIPED
//remember to reseed data/repost data if necessary, or turn force: false if the models aren't being updated
sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => console.log("App is listening on http://localhost:3000"));
});
