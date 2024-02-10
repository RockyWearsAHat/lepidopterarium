
const Comments = require('./Comments');
const Lepo = require('./Lepo');
const User = require('./user');
const Region = require('./Region');

Lepo.belongsTo(Region, {
    foreignKey: 'regionId'
});
Region.hasMany(Lepo, {
    foreignKey:'regionId',
});


Comments.belongsTo(Lepo, {
    foreignKey: 'lepoId'
})
Lepo.hasMany(Comments, {
    foreignKey: 'lepoId',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'userId'
})
User.hasMany(Comments, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});


module.exports = { Region, Lepo, User, Comments };


