const Comments = require("../models").Comments;

const commentsData = [
  {
    comment: "WOWZA",
    userId: 2,
    lepoId: 1,
  },
  {
    comment: "SO COO",
    userId: 3,
    lepoId: 1,
  },
  {
    comment: 'I literally like love this lit life !! Call it a-"lit"-eration',
    userId: 4,
    lepoId: 2,
  },
  {
    comment: "We da best!",
    userId: 1,
    lepoId: 1,
  },
  {
    comment: "Anotha one!",
    userId: 1,
    lepoId: 2,
  },
  {
    comment: "God did! ",
    userId: 1,
    lepoId: 3,
  },
  {
    comment: "I call her chandelier",
    userId: 1,
    lepoId: 2,
  },
];

const seedComments = () => Comments.bulkCreate(commentsData);

module.exports = seedComments;
