const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Grupo = require('./Grupo.js');
const Materia = require('./Materia.js');
const Docente = require('./Docente.js');


class Modulo extends Model { }
Modulo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hora: {
        type: DataTypes.INTEGER, //1-8
        allowNull: false
    },
    grupoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Grupo,
            key: 'id'
        }
    },
    materiaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Materia,
            key: 'id'
        }
    },
    docenteId: {
        type: DataTypes.INTEGER,
        references: {
            model: Docente,
            key: 'id'
        }
    },

}, {
    sequelize,
    modelName: 'modulo',
    tableName: 'modulos',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['hora', 'grupoId'],
            name: 'moduloIndex'
        }
    ]


});
Modulo.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });
Modulo.belongsTo(Materia, { foreignKey: 'materiaId', as: 'materia' });
Modulo.belongsTo(Docente, { foreignKey: 'docenteId', as: 'docente' });
module.exports = Modulo;