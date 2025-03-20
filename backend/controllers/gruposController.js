const GrupoModel = require('../models/Grupo.js');
const UsuarioGrupo = require('../models/UsuarioGrupo.js');
const ModuloModel = require('../models/Modulo.js');

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
module.exports.getGruposPermitidos = async (req, res) => {
    try {
        const rolId = req.session.token.rolId;

        let grupos;

        if (rolId === 1 || rolId === 3) {
            grupos = await GrupoModel.findAll({
                where: {
                    isActive: true
                }
            });
        } else if (rolId === 2) { // Jefegpo (2)
            const usuarioGrupo = await UsuarioGrupo.findOne({
                where: {
                    usuarioId: req.session.token.id
                },
                include: [
                    {
                        model: GrupoModel,
                        as: 'grupo',
                        where: {
                            isActive: true
                        }
                    }
                ]
            });

            if (usuarioGrupo) {
                grupos = [usuarioGrupo.grupo];
            } else {
                grupos = [];
            }
        } else if (rolId === 4) { // Docente (4)
            // Obtener los grupos en los que el docente imparte clases
            const modulos = await ModuloModel.findAll({
                where: {
                    docenteId: req.session.token.id // ID del usuario logueado
                },
                include: [
                    {
                        model: GrupoModel,
                        as: 'grupo',
                        where: {
                            isActive: true
                        }
                    }
                ]
            });

            // Extraer los grupos únicos
            const gruposUnicos = new Map();
            modulos.forEach(modulo => {
                if (modulo.grupo && !gruposUnicos.has(modulo.grupo.id)) {
                    gruposUnicos.set(modulo.grupo.id, modulo.grupo);
                }
            });

            grupos = Array.from(gruposUnicos.values());
        } else {
            return res.status(403).json({ message: 'Rol no válido' });
        }

        return res.json(grupos);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
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
