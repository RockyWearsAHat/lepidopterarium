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
//IGNORE THIS COMMENT
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
  const tuna = req.body
  console.log("Hello",req.body)
  const commentsAndUsers = [
    { comment: 'Sick butterfly', user: 'Spidey' },
    { comment: `Takes me back to the good 'ol days, when we would entertain ourselves with catching butterfly tournaments`, user: 'Mazerrackham' },
    { comment: 'Have you ever petted a butterfly', user: 'Vegeta' },
];
  res.render("description", {commentsAndUsers} );
});


// app.post("/description", (req, res) => {
//   const {comment} = req.body;
//   console.log('Received comment:', comment)
//   res.json({success: true, message: comment})
// });

app.get("/:region", (req, res) => {
  console.log(req.query.region);
  const data={}
  res.render("region", { layout: "main", data: data });
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("Logged out user");
    res.render("logout", { layout: "main" });
  });
});



//#endregion

//Force sync models, NOTE - FORCE: TRUE CAUSES ALL MODELS AND DATA FROM CURRENT DB TO BE WIPED
//remember to reseed data/repost data if necessary, or turn force: false if the models aren't being updated
sequelize.sync({ force: false }).then(() => {
  // seedAll();
  app.listen(3000, () => console.log("App is listening on http://localhost:3000"));
});
