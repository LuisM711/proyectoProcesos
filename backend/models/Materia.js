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


            //civil
            await Materia.findOrCreate({ where: { nombre: 'Análisis Estructural' } });
            await Materia.findOrCreate({ where: { nombre: 'Procesos Constructivos' } });
            await Materia.findOrCreate({ where: { nombre: 'Tecnología del Concreto' } });
            await Materia.findOrCreate({ where: { nombre: 'Ingeniería en Sistemas' } });
            await Materia.findOrCreate({ where: { nombre: 'Mecánica de Suelos' } });
            await Materia.findOrCreate({ where: { nombre: 'Hidrología' } });
            await Materia.findOrCreate({ where: { nombre: 'Laboratorio IS, MS y TC' } });

        }
    },
    sequelize,
    modelName: 'materia',
    tableName: 'materias',
    timestamps: false,

});

module.exports = Materia;