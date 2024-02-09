const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConn");

class Lepo extends Model {}

Lepo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    region: {
      type: DataTypes.STRING,
    },
    Name: {
      type: DataTypes.STRING,
    },
    DESC: {
      type: DataTypes.STRING,
    },
    Images: {
      type: DataTypes.BLOB,
    },
    Facts: {
      type: DataTypes.STRING,
    },
    Comments: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "Lepo",
  }
);

module.exports = Lepo;
