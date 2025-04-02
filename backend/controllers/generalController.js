const GrupoModel = require('../models/Grupo.js');
const ModuloModel = require('../models/Modulo.js');
const HoraModel = require('../models/Hora.js');
const RolModel = require('../models/Rol.js');
const AulaModel = require('../models/Aula.js');
const CarreraModel = require('../models/Carrera.js');

module.exports.verificarHoraDocente = async (req, res) => {
    try {
        const { docenteId, horaId } = req.body;
        const modulos = await ModuloModel.findAll({
            where: {
                docenteId,
                horaId
            }
        });
        return res.json(modulos.length > 0);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports.verificarHoraGrupo = async (req, res) => {
    try {
        const { grupoId, horaId } = req.body;
        const modulos = await ModuloModel.findAll({
            where: {
                grupoId,
                horaId
            }
        });
        return res.json(modulos.length > 0);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getHoras = async (req, res) => {
    try {
        const horas = await HoraModel.findAll();
        return res.json(horas);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getRoles = async (req, res) => {

    try {
        const roles = await RolModel.findAll();
        return res.json(roles);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getAulas = async (req, res) => {
    try {
        const aulas = await AulaModel.findAll();
        return res.json(aulas);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getCarreras = async (req, res) => {
    try {
        const carreras = await CarreraModel.findAll();
        return res.json(carreras);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}