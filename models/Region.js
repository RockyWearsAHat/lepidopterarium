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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        butterfly_ids: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'region',
    }
);

module.exports = Region;

