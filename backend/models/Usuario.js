const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Rol = require('./Rol.js');
const Grupo = require('./Grupo.js');
class Usuario extends Model { }
Usuario.init({
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
    numeroDeCuenta: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grupoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Grupo,
            key: 'id'
        }
    },
    rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rol,
            key: 'id'
        }
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    hooks: {
        afterSync: async (options) => {
            await Usuario.findOrCreate({ where: { nombre: 'Luis Mario', apellido: 'López Reyes', numeroDeCuenta: '18002188', password: 'Luis1234', grupoId: 1, rolId: 1 } });
            await Usuario.findOrCreate({ where: { nombre: 'Juan', apellido: 'Perez', numeroDeCuenta: '12345678', password: '12345678', grupoId: 1, rolId: 1 } });
        }
    },
    sequelize,
    modelName: 'usuario',
    tableName: 'usuarios',
    timestamps: false,

});
Usuario.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });
Usuario.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' });


module.exports = Usuario;