
const Comments = require('./Comments');
const Lepo = require('./Lepo');
const user = require('./user');
const Region = require('./Region');


Comments.hasMany(Lepo,{
foreignKey: 'Comment_id',
});

Comments.belongsTo(user,{
    foreignKey: '',
});

Comments.hasMany(Lepo,{
foreignKey: 'Lepo_id',
});

// Comments.belongsTo(Lepo);

// Lepo.belongsTo()

module.exports = { Comments, Lepo, user, Region };


