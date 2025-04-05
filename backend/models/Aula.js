const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Aula extends Model { }
Aula.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    hooks: {
        afterSync: async (options) => {
            await Aula.findOrCreate({ where: { numero: "CC1" } });
            await Aula.findOrCreate({ where: { numero: "CC2" } });
            await Aula.findOrCreate({ where: { numero: "CC3" } });
            await Aula.findOrCreate({ where: { numero: "CC4" } });

            await Aula.findOrCreate({ where: { numero: "SUM" } });


            await Aula.findOrCreate({ where: { numero: 1 } });
            await Aula.findOrCreate({ where: { numero: 2 } });
            await Aula.findOrCreate({ where: { numero: 3 } });
            await Aula.findOrCreate({ where: { numero: 4 } });
            await Aula.findOrCreate({ where: { numero: 5 } });
            await Aula.findOrCreate({ where: { numero: 6 } });
            await Aula.findOrCreate({ where: { numero: 7 } });
            await Aula.findOrCreate({ where: { numero: 8 } });
            await Aula.findOrCreate({ where: { numero: 9 } });
            await Aula.findOrCreate({ where: { numero: 10 } });
            await Aula.findOrCreate({ where: { numero: 15 } });
            await Aula.findOrCreate({ where: { numero: 16 } });
        }
    },
    sequelize,
    modelName: 'aula',
    tableName: 'aulas',
    timestamps: false,
});




module.exports = Aula;