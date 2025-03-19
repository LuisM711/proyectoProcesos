//UsuarioGrupo.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Grupo = require('./Grupo.js');

class UsuarioGrupo extends Model { }
UsuarioGrupo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    grupoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Grupo,
            key: 'id'
        },
        unique: true
    }
}, {
    sequelize,
    modelName: 'usuarioGrupo',
    tableName: 'usuarioGrupos',
    timestamps: false,
});

UsuarioGrupo.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });

module.exports = UsuarioGrupo;
