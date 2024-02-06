const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelizeConn");
const bcrypt = require("bcrypt");

class User extends Model {
  validatePassword = async (password) => {
    return await bcrypt.compare(password, this.password);
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "User",
    hooks: {
      beforeCreate: async (User) => {
        const salt = await bcrypt.genSaltSync();
        User.password = await bcrypt.hash(User.password, salt);
      },
    },
  }
);

module.exports = User;
