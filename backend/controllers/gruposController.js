const GrupoModel = require('../models/Grupo.js');


module.exports.getGrupos = async (req, res) => {
    try {
        const grupos = await GrupoModel.findAll();
        return res.json(grupos);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getGruposActivos = async (req, res) => {
    try {
        const grupos = await GrupoModel.findAll({
            where: {
                isActive: true
            }
        });
        return res.json(grupos);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.postGrupo = async (req, res) => {
    try {
        const grupo = await GrupoModel.create(req.body);
        return res.json(grupo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.putGrupo = async (req, res) => {
    try {
        const grupo = await GrupoModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.json(grupo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.deleteGrupo = async (req, res) => {
    try {
        //isActive false
        const grupo = await GrupoModel.update({
            isActive: false
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.json(grupo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
