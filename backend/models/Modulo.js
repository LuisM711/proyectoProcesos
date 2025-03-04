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
            await Modulo.findOrCreate({ where: { horaId: 8, grupoId: 1, materiaId: 1, docenteId: 1 } });
            await Modulo.findOrCreate({ where: { horaId: 9, grupoId: 1, materiaId: 2, docenteId: 2 } });
            await Modulo.findOrCreate({ where: { horaId: 10, grupoId: 1, materiaId: 3, docenteId: 3 } });
            await Modulo.findOrCreate({ where: { horaId: 11, grupoId: 1, materiaId: 4, docenteId: 4 } });
            await Modulo.findOrCreate({ where: { horaId: 12, grupoId: 1, materiaId: 5, docenteId: 5 } });
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