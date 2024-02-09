const sequelize = require('../config/connection');


const Lepo = require('../models/Lepo.js');
// const Comments = require('../models/Comments.js');

const lepidopteraSeedData = require('./bookSeedData.json');

const seedDatabase = () => {
  return sequelize.sync({ force: true }).then(() => {
    Lepo.bulkCreate(lepidopteraSeedData).then(() => {
        console.log('All Seeds Planted');
      });
    });
  };