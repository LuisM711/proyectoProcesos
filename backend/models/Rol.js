const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Rol extends Model { }
Rol.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    hooks: {
        afterSync: async (options) => {
            await Rol.findOrCreate({ where: { nombre: 'admin' } });
            await Rol.findOrCreate({ where: { nombre: 'jefegpo' } });
            await Rol.findOrCreate({ where: { nombre: 'checador' } });
            await Rol.findOrCreate({ where: { nombre: 'docente' } });
        }
    },
    sequelize,
    modelName: 'rol',
    tableName: 'roles',
    timestamps: false,
});

module.exports = Rol;