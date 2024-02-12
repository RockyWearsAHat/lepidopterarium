const Comment = require("./Comments");
const Lepo = require("./Lepo");
const user = require("./user");
const Region = require('./Region');

Comment.hasMany(Lepo, {
  foreignKey: "allComments",
  onDelete: "CASCADE",
});

Comment.belongsTo(Lepo, {foreignKey: "LepoId"});
Comment.belongsTo(user, {foreignKey: "UserId"});

Comment.hasMany(user, {
  foreignKey: "userComments",
  onDelete: "CASCADE",
});

Region.hasOne(Lepo, {
  foreignKey: "regionId",
  onDelete: "CASCADE",
});

module.exports = { Comment, Lepo, user, Region };
