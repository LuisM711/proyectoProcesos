const DocenteModel = require('../models/Docente.js');


module.exports.getDocentes = async (req, res) => {
    try {
        const docentes = await DocenteModel.findAll();
        return res.json(docentes);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getDocentesActivos = async (req, res) => {
    try {
        const docentes = await DocenteModel.findAll({
            where: {
                isActive : true
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
                id: req.params.id
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
                id: req.params.id
            }
        });
        return res.json(docente);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}