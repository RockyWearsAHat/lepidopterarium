const { Comments } = require("../models");

const commentsData = [
  {
    id: 1,
    comment: "WOWZA",
    userId: 2,
    lepoId: 1,
  },
  {
    id: 2,
    comment: "SO COO",
    userId: "3",
    lepoId: 1,
  },
  {
    id: 3,
    comment: 'I literally like love this lit life !! Call it a-"lit"-eration',
    userId: 4,
    lepoId: 2,
  },
  {
    id: 4,
    comment: "We da best!",
    userId: 1,
    lepoId: 1,
  },
  {
    id: 5,
    comment: "Anotha one!",
    userId: 1,
    lepoId: 2,
  },
  {
    id: 6,
    comment: "God did! ",
    userId: 1,
    lepoId: 3,
  },
  {
    id: 7,
    comment: "I call her chandelier",
    userId: 1,
    lepoId: 2,
  },
];

const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;
