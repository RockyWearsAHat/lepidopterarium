const sequelize = require('../db/sequelizeConn.js');
const seedRegions = require('./regionData');


const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedRegions();
  
    process.exit(0);
  };

seedAll();
