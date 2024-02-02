const express = require("express");
const handlebars = require("express-handlebars");
const sequelize = require("./db/sequelizeConn");
const masterRouter = require("./routes/masterRouter");
require("dotenv").config();

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

//Use all API/backend routes defined in ./routes/masterRouter.js
app.use("/", masterRouter);

//View/render routes
app.get("/", (req, res) => {
  res.render("landingPage", { layout: "default" });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "default" });
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
