const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Materia extends Model { }
Materia.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'materia',
    tableName: 'materias',
    timestamps: false,

});

module.exports = Materia;