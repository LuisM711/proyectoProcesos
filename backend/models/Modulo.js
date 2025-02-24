const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Grupo = require('./Grupo.js');
const Materia = require('./Materia.js');
const Docente = require('./Docente.js');

const Hora = require('./Hora.js');


class Modulo extends Model { }
Modulo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    horaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hora,
            key: 'id'
        }

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
    hooks: {
        afterSync: async (options) => {
            await Modulo.findOrCreate({ where: { horaId: 1, grupoId: 1, materiaId: 1, docenteId: 1 } });
        }
    },
    sequelize,
    modelName: 'modulo',
    tableName: 'modulos',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['horaId', 'grupoId'],
            name: 'moduloIndex'
        }
    ]


});
Modulo.belongsTo(Hora, { foreignKey: 'horaId', as: 'hora' });
Modulo.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });
Modulo.belongsTo(Materia, { foreignKey: 'materiaId', as: 'materia' });
Modulo.belongsTo(Docente, { foreignKey: 'docenteId', as: 'docente' });
module.exports = Modulo;