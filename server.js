//#region Requires
const express = require("express");
const handlebars = require("express-handlebars");
const sequelize = require("./db/sequelizeConn");
const seedAll = require('./seeds/index.js'); // Adjust the path to where seedAll is defined


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



//   // Fetch all comments
//   Comments.findAll()
//   .then(comments => {
//     // Process fetched comments
//     console.log(comments);
//   })
//   .catch(error => {
//     // Handle error
//     console.error('Error fetching comments:', error);
//   });


// app.get("/description", async (req, res) => {
//   const tuna = req.body
//   console.log("Hello",req.body)

//   const commentsAndUsers = [
//     { comment: 'Sick butterfly', user: 'Spidey' },
//     { comment: `Takes me back to the good 'ol days, when we would entertain ourselves with catching butterfly tournaments`, user: 'Mazerrackham' },
//     { comment: 'Have you ever petted a butterfly', user: 'Vegeta' },
// ];
//   res.render("description", {commentsAndUsers} );
// });

app.get("/description", async (req, res) => {
  try {
    // Fetch all comments
    // const a = await Region.findAll();
    const comments = await Comments.findAll();

    // Process fetched comments
    console.log(comments);

    // Sample data to render alongside comments
    const commentsAndUsers = [
      { comment: 'Sick butterfly', user: 'Spidey' },
      { comment: `Takes me back to the good 'ol days, when we would entertain ourselves with catching butterfly tournaments`, user: 'Mazerrackham' },
      { comment: 'Have you ever petted a butterfly', user: 'Vegeta' },
    ];

    // Render the description template with comments and users data
    res.render("description", { commentsAndUsers, comments });
  } catch (error) {
    // Handle error
    console.error('Error fetching comments:', error);
    res.status(500).send('Error fetching comments');
  }
});

//SEE HERE for accessing db data -LK
app.get("/:region", async (req, res) => {
  // Using :region (^See above) we can access the given info passed in the URL. Since the hrefs  in the html lead us to /africa or (/(regionname)), rather than search the db by name  -LK
  console.log(`-------------- PARAMS : ${req.params.region}`);

  let paramId;
  // Ive added this switch case to get the ids. Its hard coded so not friendly for future dev but it works for now. The names in the db dont match the names in the href anyways and im too lazy to fix it. -LK
  switch (req.params.region) {
    case 'central': paramId = 1;break;
    case 'africa': paramId = 2;break;
    case 'southamerica': paramId = 3;break;
    case 'asia': paramId = 4;break;
    case 'guinea': paramId = 5;break;
    case 'seasia': paramId = 6;break;
    default: break;
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
    if (!dbRegionData){
      return res.status(404).send("Region Data not found");
    }
    //Data has to be converted to this plain then we can access the data as an object in the handlebars files. ex. {{data.regionName}} !! P.S.(in handlebars the object is always called data because its silly
    // to call the object by the given var name here i guess) -LK
    const regionData = dbRegionData.get({ plain: true })
    console.log(regionData);
    //Here we use the handlebars render function to get the "region" file(1st parameter) to render in the body of the "main" layout. We are also passing the regionData to display. -LK
    res.render("region", { layout: "main", data: regionData });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
// sequelize.sync({ force: false }).then(() => {
//   seedAll();
//   app.listen(3000, () => console.log("App is listening on http://localhost:3000"));
// });

// seedAll()
async function startServer() {
  try {
    await sequelize.sync({ force: false });
    await seedAll();
    app.listen(3000, () => console.log("App is listening on http://localhost:3000"));
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startServer();