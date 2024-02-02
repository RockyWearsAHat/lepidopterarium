require("dotenv").config();

const authGetAPIRoute = (req, res, next) => {
  if (process.env.enableGetAPIRoutes == "false" || !process.env.enableGetAPIRoutes) {
    res.json("Unknown key, are get api routes enabled on the server (enableGetAPIRoutes) in .env?");
  } else {
    return next();
  }
};

module.exports = authGetAPIRoute;
