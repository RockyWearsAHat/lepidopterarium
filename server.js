//#region Requires
const express = require("express");
const handlebars = require("express-handlebars");
const sequelize = require("./db/sequelizeConn");
// const seedAll = require('./seeds/index.js'); // Adjust the path to where seedAll is defined

const session = require("express-session");
const sessionOpts = require("./db/session");
const masterRouter = require("./routes/masterRouter");
require("dotenv").config();
//#endregion
//Include all the models we have created to use in our http functions! -LK
const { Region, Lepo, User, Comments } = require("./models");

const app = express();

//Make sure to app.use all middlewares before any of the routes to ensure they behave correctly for all routes
//#region Engine/Paths/Parsing/Middlewares

//Set up handlebars
const hbs = handlebars.create({
  layoutsDir: app.get("layouts"),
  partialsDir: app.get("partials"),
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", process.cwd() + "/views");

app.set("view engine", "handlebars");

//Set up static routes for references on pages
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

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

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("Logged out user");
    res.render("logout", { layout: "main" });
  });
});

app.get("/butterfly/:id", async (req, res) => {
  // if (req.session && req.session.loggedIn == true) console.log("logged in!");
  try {
    // Fetch all comments
    // const a = await Region.findAll();
    // const comments = await Comments.findAll();
    let paramId = req.params.id;
    let dbButterflyData;
    //Fetch correct data for name or id parameter passed in URL
    if (!isNaN(paramId) && !isNaN(parseFloat(paramId))) {
      dbButterflyData = await Lepo.findByPk(paramId, {
        include: [
          {
            model: Region,
            attributes: ["regionName"],
          },
          {
            model: Comments, // Include comments associated with OtherModel
            include: [
              {
                model: User, // Include data from User model
                attributes: ["username"], // Include only the 'username' attribute from User model
              },
            ],
          },
        ],
      });
    } else {
      paramId = paramId.split("_").join(" ");
      dbButterflyData = await Lepo.findOne({
        where: { name: paramId },
        include: [
          {
            model: Region,
            attributes: ["regionName"],
          },
          {
            model: Comments, // Include comments associated with OtherModel
            include: [
              {
                model: User, // Include data from User model
                attributes: ["username"], // Include only the 'username' attribute from User model
              },
            ],
          },
        ],
      });
    }

    if (!dbButterflyData) {
      return res.status(404).send("Butterfly data not found");
    }

    const butterflyData = dbButterflyData.get({ plain: true });
    const images = JSON.parse(butterflyData.images);

    res.render("description", {
      layout: "main",
      butterflyData: butterflyData,
      images: images,
      loggedIn: req.session.loggedIn,
    });

    //If query param is a number, assume user should be redirected to the /name of butterfly
    if (!isNaN(paramId) && !isNaN(parseFloat(paramId))) {
      res.redirect(
        `/butterfly/${butterflyData.name.split(" ").join("_").toLowerCase()}`
      );
    }
  } catch (error) {
    // Handle error
    console.error("Error fetching comments:", error);
    res.status(500).send("Error processing request");
  }
});

//SEE HERE for accessing db data -LK
app.get("/:region", async (req, res) => {
  if (req.session && req.session.loggedIn == true) console.log("logged in!");
  // Using :region (^See above) we can access the given info passed in the URL. Since the hrefs  in the html lead us to /africa or (/(regionname)), rather than search the db by name  -LK
  console.log(`-------------- PARAMS : ${req.params.region}`);

  let paramId;
  // Ive added this switch case to get the ids. Its hard coded so not friendly for future dev but it works for now. The names in the db dont match the names in the href anyways and im too lazy to fix it. -LK
  switch (req.params.region) {
    case "central":
      paramId = 1;
      break;
    case "africa":
      paramId = 2;
      break;
    case "southamerica":
      paramId = 3;
      break;
    case "asia":
      paramId = 4;
      break;
    case "guinea":
      paramId = 5;
      break;
    case "seasia":
      paramId = 6;
      break;
    default:
      break;
  }
  try {
    const dbRegionData = await Region.findByPk(paramId, {
      //Including lepo here to display a pic of the butter fly and the name -LK
      include: [
        {
          model: Lepo,
        },
      ],
    });
    if (!dbRegionData) {
      return res.status(404).send("Region Data not found");
    }

    //Data has to be converted to this plain then we can access the data as an object in the handlebars files. ex. {{data.regionName}} !! -LK
    const regionData = dbRegionData.get({ plain: true });

    console.log(regionData);
    console.log(regionData.Lepos);

    regionData.Lepos.forEach((lepo) => {
      const imagesArray = JSON.parse(lepo.images);

      lepo.images = imagesArray;
    });
    //Here we use the handlebars render function to get the "region" file(1st parameter) to render in the body of the "main" layout. We are also passing the regionData to display. -LK
    res.render("region", {
      layout: "main",
      regionData: regionData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//#endregion
async function startServer() {
  try {
    if (process.env.DATABASE_URL) {
      await sequelize.authenticate();
    } else {
      await sequelize.sync({ force: false });
    }
    app.listen(process.env.PORT || 3000, () =>
      console.log("App is listening on http://localhost:3000")
    );
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startServer();
