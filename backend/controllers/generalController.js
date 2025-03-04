const GrupoModel = require('../models/Grupo.js');
const ModuloModel = require('../models/Modulo.js');
const HoraModel = require('../models/Hora.js');
const RolModel = require('../models/Rol.js');

//verificar si el docente tiene ocupado Modulo.hora, ya que un docente no puede tener dos modulos a la misma hora
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


//verificar si el grupo tiene ocupado Modulo.hora, ya que un grupo no puede tener dos modulos a la misma hora
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