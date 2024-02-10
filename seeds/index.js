const sequelize = require("../db/sequelizeConn.js");

const seedRegions = require("./region-seeds.js");
const seedLepo = require("./lepidoptera-seeds.js");
const seedUsers = require("./user-seeds.js");
const seedComments = require("./comments-seeds.js");



const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  //Using await fucntions to seed each table individually
  await seedRegions();
  console.log('\n----- REGIONS SEEDED -----\n');
  await seedLepo();
  console.log('\n----- LEPOS SEEDED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');


  process.exit(0);
};

seedAll();
