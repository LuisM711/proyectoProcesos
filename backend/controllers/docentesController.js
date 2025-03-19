const { where } = require('sequelize');
const DocenteModel = require('../models/Usuario.js');


module.exports.getDocentes = async (req, res) => {
    try {
        const docentes = await DocenteModel.findAll({
            where: {
                rolId: 4
            },
            order: [
                ['isActive', 'DESC']
            ]
        });
        return res.json(docentes);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getDocentesActivos = async (req, res) => {
    try {
        const docentes = await DocenteModel.findAll({

            where: {
                isActive : true,
                rolId: 4
            }
        });
        return res.json(docentes);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.postDocente = async (req, res) => {
    try {
        const docente = await DocenteModel.create(req.body);
        return res.json(docente);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.putDocente = async (req, res) => {
    try {
        const docente = await DocenteModel.update(req.body, {
            where: {
                id: req.params.id,
                rolId: 4
            }
        });
        return res.json(docente);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.deleteDocente = async (req, res) => {
    try {
        //isActive false
        const docente = await DocenteModel.update({
            isActive: false
        }, {
            where: {
                id: req.params.id,
                rolId: 4
            }
        });
        return res.json(docente);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}