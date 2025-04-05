const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Grupo = require('./Grupo.js');
const Materia = require('./Materia.js');
const Docente = require('./Usuario.js');
const Aula = require('./Aula.js');
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
    aulaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Aula,
            key: 'id'
        },
        allowNull: false
    },

}, {
    hooks: {
        afterSync: async (options) => {

            //4-02 IS
            await Modulo.findOrCreate({ where: { horaId: 8, grupoId: 1, materiaId: 1, docenteId: 1, aulaId: 17 } });
            await Modulo.findOrCreate({ where: { horaId: 9, grupoId: 1, materiaId: 2, docenteId: 2, aulaId: 17 } });
            await Modulo.findOrCreate({ where: { horaId: 10, grupoId: 1, materiaId: 3, docenteId: 3, aulaId: 17 } });
            await Modulo.findOrCreate({ where: { horaId: 11, grupoId: 1, materiaId: 4, docenteId: 4, aulaId: 17 } });
            await Modulo.findOrCreate({ where: { horaId: 12, grupoId: 1, materiaId: 5, docenteId: 5, aulaId: 17 } });

            //3-01 Civil
            await Modulo.findOrCreate({ where: { horaId: 1, grupoId: 3, materiaId: 6, docenteId: 8, aulaId: 14 } });
            await Modulo.findOrCreate({ where: { horaId: 2, grupoId: 3, materiaId: 7, docenteId: 14, aulaId: 14 } });
            await Modulo.findOrCreate({ where: { horaId: 3, grupoId: 3, materiaId: 8, docenteId: 9, aulaId: 14 } });
            await Modulo.findOrCreate({ where: { horaId: 4, grupoId: 3, materiaId: 9, docenteId: 6, aulaId: 14 } });
            await Modulo.findOrCreate({ where: { horaId: 5, grupoId: 3, materiaId: 10, docenteId: 11, aulaId: 14 } });
            await Modulo.findOrCreate({ where: { horaId: 6, grupoId: 3, materiaId: 11, docenteId: 12, aulaId: 14 } });

            //3-02 Civil
            await Modulo.findOrCreate({ where: { horaId: 1, grupoId: 4, materiaId: 6, docenteId: 16, aulaId: 15 } });
            await Modulo.findOrCreate({ where: { horaId: 2, grupoId: 4, materiaId: 9, docenteId: 15, aulaId: 15 } });
            await Modulo.findOrCreate({ where: { horaId: 3, grupoId: 4, materiaId: 7, docenteId: 14, aulaId: 15 } });
            await Modulo.findOrCreate({ where: { horaId: 4, grupoId: 4, materiaId: 8, docenteId: 9, aulaId: 15 } });
            await Modulo.findOrCreate({ where: { horaId: 5, grupoId: 4, materiaId: 11, docenteId: 12, aulaId: 15 } });
            await Modulo.findOrCreate({ where: { horaId: 6, grupoId: 4, materiaId: 7, docenteId: 14, aulaId: 15 } });

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
        },
        {
            unique: true,
            fields: ['horaId', 'aulaId'],
            name: 'moduloAulaIndex'
        },
        {
            unique: true,
            fields: ['horaId', 'docenteId'],
            name: 'moduloDocenteIndex'
        }
    ]


});
Modulo.belongsTo(Hora, { foreignKey: 'horaId', as: 'hora' });
Modulo.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });
Modulo.belongsTo(Materia, { foreignKey: 'materiaId', as: 'materia' });
Modulo.belongsTo(Docente, { foreignKey: 'docenteId', as: 'docente' });
Modulo.belongsTo(Aula, { foreignKey: 'aulaId', as: 'aula' });
module.exports = Modulo;