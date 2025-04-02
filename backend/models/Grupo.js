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
        afterSync: async (options) => {
            await Grupo.findOrCreate({ where: { grado: 4, grupo: 2, carreraId: 1 } });
            await Grupo.findOrCreate({ where: { grado: 4, grupo: 1, carreraId: 1 } });
        }
    },
    sequelize,
    modelName: 'grupo',
    tableName: 'grupos',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['grado', 'grupo'],
            name: 'gruposIndex'
        }
    ]
});

Grupo.belongsTo(Carrera, { foreignKey: 'carreraId', as: 'carrera' });
module.exports = Grupo;