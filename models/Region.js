const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelizeConn.js');

class Region extends Model { }

Region.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        regionName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(5000),
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'region',
    }
);

module.exports = Region;

