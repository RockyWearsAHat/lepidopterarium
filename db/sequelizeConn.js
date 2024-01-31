const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("butterDB", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
