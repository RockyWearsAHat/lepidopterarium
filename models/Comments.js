const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelizeConn');

class Comments extends Model { }

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize, 
        freezeTableName: true,
        modelName: "Comments", 
    });

    module.exports = Comments; 

