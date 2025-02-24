const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Docente extends Model { }
Docente.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}
    , {
        hooks: {
            afterSync: async (options) => {
                await Docente.findOrCreate({ where: { nombre: 'Mirsa', apellido: 'Inzunza' } });
                await Docente.findOrCreate({ where: { nombre: 'José Miguel', apellido: 'Mendívil' } });
                await Docente.findOrCreate({ where: { nombre: 'Herman', apellido: 'Ayala' } });
                await Docente.findOrCreate({ where: { nombre: 'Yobani', apellido: 'Martínez' } });
                await Docente.findOrCreate({ where: { nombre: 'Rocío', apellido: 'Becerra' } });
            }
        },
        sequelize,
        modelName: 'docente',
        tableName: 'docentes',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['nombre', 'apellido'],
                name: 'compositeIndex'
            }
        ]

    });

module.exports = Docente;