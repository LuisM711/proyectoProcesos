const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const Carrera = require('./Carrera.js');

class Grupo extends Model { }
Grupo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    grado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grupo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombreGrupo: {
        type: DataTypes.VIRTUAL,
        get() {
            const grado = this.getDataValue('grado');
            const grupo = this.getDataValue('grupo').toString().padStart(2, '0');
            return `${grado}-${grupo}`;
        }
    },
    carreraId: {
        type: DataTypes.INTEGER,
        references: {
            model: Carrera,
            key: 'id'
        },
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    hooks: {
        /**
         * await Carrera.findOrCreate({ where: { nombre: 'Ingeniería de Software' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería Civil' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería en Procesos Industriales' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería Geodésica' } });
            await Carrera.findOrCreate({ where: { nombre: 'Ingeniería en Nanotecnología y Energías Renovables' } });
         */
        afterSync: async (options) => {
            //software
            await Grupo.findOrCreate({ where: { grado: 4, grupo: 2, carreraId: 1 } });
            await Grupo.findOrCreate({ where: { grado: 4, grupo: 1, carreraId: 1 } });

            //civil
            await Grupo.findOrCreate({ where: { grado: 3, grupo: 1, carreraId: 2 } });
            await Grupo.findOrCreate({ where: { grado: 3, grupo: 2, carreraId: 2 } });
        }
    },
    sequelize,
    modelName: 'grupo',
    tableName: 'grupos',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['grado', 'grupo', 'carreraId'],
            name: 'gruposIndex'
        }
    ]
});

Grupo.belongsTo(Carrera, { foreignKey: 'carreraId', as: 'carrera' });
module.exports = Grupo;