const MateriaModel = require('../models/Materia.js');

module.exports.getMaterias = async (req, res) => {
    try {
        const materias = await MateriaModel.findAll();
        return res.json(materias);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getMateriasActivas = async (req, res) => {
    try {
        const materias = await MateriaModel.findAll({
            where: {
                isActive: true
            }
        });
        return res.json(materias);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.postMateria = async (req, res) => {
    try {
        const materia = await MateriaModel.create(req.body);
        return res.json(materia);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.putMateria = async (req, res) => {
    try {
        const materia = await MateriaModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.json(materia);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.deleteMateria = async (req, res) => {
    try {
        //isActive false
        const materia = await MateriaModel.update({
            isActive: false
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.json(materia);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
