const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

const Modulo = require('./Modulo.js');
const Usuario = require('./Usuario.js');

class Registro extends Model { }
Registro.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    moduloId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Modulo,
            key: 'id'
        }
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    impartida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    // observaciones: {
    //     type: DataTypes.TEXT,
    //     allowNull: true
    // }
}, {
    sequelize,
    modelName: 'registro',
    tableName: 'registros',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['moduloId', 'usuarioId', 'fecha'],
            name: 'registroIndex'
        }
    ]
});


Registro.belongsTo(Modulo, { foreignKey: 'moduloId', as: 'modulo' });
Registro.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = Registro;