//Usuario.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const UsuarioGrupo = require('./UsuarioGrupo.js');
const Rol = require('./Rol.js');

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
            await Usuario.findOrCreate({ where: { nombre: 'Mirsa', apellido: 'Inzunza', numeroDeCuenta: '12121212', password: '12121212', rolId: 4 } });
            await Usuario.findOrCreate({ where: { nombre: 'José Miguel', apellido: 'Mendivil', numeroDeCuenta: '11112222', password: '11112222', rolId: 4 } });
            await Usuario.findOrCreate({ where: { nombre: 'Herman', apellido: 'Ayala', numeroDeCuenta: '22221111', password: '22221111', rolId: 4 } });
            await Usuario.findOrCreate({ where: { nombre: 'Yobani', apellido: 'Martinez', numeroDeCuenta: '33332222', password: '33332222', rolId: 4 } });
            await Usuario.findOrCreate({ where: { nombre: 'Rocío', apellido: 'Becerra', numeroDeCuenta: '33331111', password: '33331111', rolId: 4 } });

            await Usuario.findOrCreate({ where: { nombre: 'Luis Mario', apellido: 'López Reyes', numeroDeCuenta: '18002188', password: 'Luis1234', rolId: 1 } });
            await Usuario.findOrCreate({ where: { nombre: 'Juan', apellido: 'Perez', numeroDeCuenta: '12345678', password: '12345678', rolId: 1 } });

            //checador
            await Usuario.findOrCreate({ where: { nombre: 'Jose', apellido: 'Lopez', numeroDeCuenta: '88888888', password:'88888888', rolId: 3 } });
            await Usuario.findOrCreate({ where: { nombre: 'Abraham', apellido: 'Linconln', numeroDeCuenta: '1234', password:'4321', rolId: 3 } });
        }
    },
    sequelize,
    modelName: 'usuario',
    tableName: 'usuarios',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['nombre', 'apellido'],
            name: 'nombreIndex'
        }
    ]
});

Usuario.belongsTo(Rol, { foreignKey: 'rolId', as: 'rol' });
Usuario.hasOne(UsuarioGrupo, { foreignKey: 'usuarioId', as: 'usuarioGrupo' });


module.exports = Usuario;