const Comments = require('./Comments');
const Lepo = require('./Lepo');
const user = require('user');

Comments.hasMany(user,{
foreignKey: 'Comment_id',
});

Comments.belongsTo(user);

Comments.hasMany(Lepo,{
foreignKey: 'Lepo_id',
});

Comments.belongsTo(Lepo);

Lepo.belongsTo()

module.exports = { Comments, Lepo, user };