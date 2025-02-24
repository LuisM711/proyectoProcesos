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
    hooks: {
        afterSync: async (options) => {
            await Materia.findOrCreate({ where: { nombre: 'Computo ubicuo' } });
            await Materia.findOrCreate({ where: { nombre: 'Innovación de procesos con NTIC' } });
            await Materia.findOrCreate({ where: { nombre: 'Graficación' } });
            await Materia.findOrCreate({ where: { nombre: 'Redes neuronales y logica difusa' } });
            await Materia.findOrCreate({ where: { nombre: 'Sistemas distribuidos' } });
        }
    },
    sequelize,
    modelName: 'materia',
    tableName: 'materias',
    timestamps: false,

});

module.exports = Materia;