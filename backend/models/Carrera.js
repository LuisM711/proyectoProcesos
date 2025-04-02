const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Carrera extends Model { }
Carrera.init({
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
    hooks: {
        afterSync: async (options) => {
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería de Software' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería Civil' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería en Procesos Industriales' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería Geodésica' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería en Nanotecnología y Energías Renovables' } });
        }
    },
    sequelize,
    modelName: 'carrera',
    tableName: 'carreras',
    timestamps: false,

});

module.exports = Carrera;