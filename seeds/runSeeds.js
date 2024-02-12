const seedAll = require("./seedAll");

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});
connection.connect((err) => {
  if (err) throw err;
});

const initDB = async () => {
  const fs = require("fs");
  const initFileStringArr = await fs.readFileSync("./db/initDB.sql").toString().split("\n");
  try {
    for (let i = 0; i < initFileStringArr.length; i++) {
      const trimmedVal = initFileStringArr[i].trim();
      connection.query(trimmedVal, function (err, rows, fields) {
        if (err) throw err;
      });
    }

    
  connection.query("USE butterDB;", function (err) {
    if (!err) {
      console.log("Created database successfully");
      connection.end();
      return true;
    }
    else {
      console.log(err);
      connection.end();
      throw new Error(`Unable to create database, ${err}`);
    }
  });

  } catch (err) {
    return {error: err.message};
  }
};

const setup = async () => {
  try {
    //Create database
    const res = await initDB();
    if (res && res.error) throw new Error("Unable to create database");
    const { User, Lepo, Comment, Region } = require("../models/models");
    console.log("Syncing Models");
    //Delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const sequelize = require("../db/sequelizeConn");
    console.log("Creating Sequelize Connection");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    sequelize.sync({ force: true }).then(async () => {
      console.log("Synced Sequelize Connection");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Seeding");
      await seedAll();
      process.exit();
    });
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

setup();
