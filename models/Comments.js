const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelizeConn');

class Comments extends Model { }

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        }
    },{
        sequelize, 
        freezeTableName: true,
        modelName: "Comments", 
    });
   
    module.exports = Comments; 

