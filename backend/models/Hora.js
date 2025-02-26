const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Hora extends Model { }
Hora.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaFin: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    hooks: {
        afterSync: async (options) => {
            await Hora.findOrCreate({ where: { numero: 1, horaInicio: '07:00:00', horaFin: '08:00:00' } });
            await Hora.findOrCreate({ where: { numero: 2, horaInicio: '08:00:00', horaFin: '09:00:00' } });
            await Hora.findOrCreate({ where: { numero: 3, horaInicio: '09:00:00', horaFin: '10:00:00' } });
            await Hora.findOrCreate({ where: { numero: 4, horaInicio: '10:00:00', horaFin: '11:00:00' } });
            await Hora.findOrCreate({ where: { numero: 5, horaInicio: '11:00:00', horaFin: '12:00:00' } });
            await Hora.findOrCreate({ where: { numero: 6, horaInicio: '12:00:00', horaFin: '13:00:00' } });
            await Hora.findOrCreate({ where: { numero: 7, horaInicio: '13:00:00', horaFin: '14:00:00' } });
            await Hora.findOrCreate({ where: { numero: 8, horaInicio: '14:00:00', horaFin: '15:00:00' } });
            await Hora.findOrCreate({ where: { numero: 9, horaInicio: '15:00:00', horaFin: '16:00:00' } });
            await Hora.findOrCreate({ where: { numero: 10, horaInicio: '16:00:00', horaFin: '17:00:00' } });
            await Hora.findOrCreate({ where: { numero: 11, horaInicio: '17:00:00', horaFin: '18:00:00' } });
            await Hora.findOrCreate({ where: { numero: 12, horaInicio: '18:00:00', horaFin: '19:00:00' } });
            await Hora.findOrCreate({ where: { numero: 13, horaInicio: '19:00:00', horaFin: '20:00:00' } });
            await Hora.findOrCreate({ where: { numero: 14, horaInicio: '20:00:00', horaFin: '21:00:00' } });
            await Hora.findOrCreate({ where: { numero: 15, horaInicio: '21:00:00', horaFin: '22:00:00' } });
            await Hora.findOrCreate({ where: { numero: 16, horaInicio: '22:00:00', horaFin: '23:00:00' } });

            
        }
    },
    sequelize,
    modelName: 'hora',
    tableName: 'horas',
    timestamps: false,

});

module.exports = Hora;