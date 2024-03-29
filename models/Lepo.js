const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelizeConn");

class Lepo extends Model {}

Lepo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sciName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    images: {
      type: DataTypes.STRING,
    },
    facts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "Lepo",
  }
);

module.exports = Lepo;
