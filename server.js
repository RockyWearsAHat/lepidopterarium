const express = require("express");
const handlebars = require("express-handlebars");

const app = express();

//Set up handlebars
const hbs = handlebars.create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("layouts", process.cwd() + "/views/layouts");
app.set("partials", process.cwd() + "/views/partials");

app.use(express.static("public"));
app.use(express.static("public/images"));

app.get("/", (req, res) => {
  res.render("homepage", { layout: "index", title: "Da Butterfly Emporium" });
});

app.listen(3000, () =>
  console.log("App is listening on http://localhost:3000")
);
