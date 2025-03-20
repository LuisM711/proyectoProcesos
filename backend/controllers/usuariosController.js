const UsuarioModel = require('../models/Usuario.js');
const UsuarioGrupoModel = require('../models/UsuarioGrupo.js');
const RolModel = require('../models/Rol.js');
const GrupoModel = require('../models/Grupo.js');

const JEFE_GPO_ROL_ID = 2; // Ajusta este ID según corresponda en tu DB

module.exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll({
            include: [
                {
                    model: RolModel,
                    as: 'rol'
                },
                {
                    model: UsuarioGrupoModel,
                    as: 'usuarioGrupo',
                    include: [{ model: GrupoModel, as: 'grupo' }]
                }
            ]
        });
        return res.json(usuarios);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.getUsuariosActivos = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll({
            where: { isActive: true },
            include: [
                {
                    model: RolModel,
                    as: 'rol'
                },
                {
                    model: UsuarioGrupoModel,
                    as: 'usuarioGrupo',
                    include: [{ model: GrupoModel, as: 'grupo' }]
                }
            ]
        });
        return res.json(usuarios);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.postUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.create(req.body);

        if (usuario.rolId == JEFE_GPO_ROL_ID) {
            await UsuarioGrupoModel.create({
                usuarioId: usuario.id,
                grupoId: req.body.grupoId
            });
        }

        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.putUsuario = async (req, res) => {
    try {
        const { rolId, grupoId } = req.body;

        // Actualiza el usuario
        const usuarioActualizado = await UsuarioModel.update(req.body, {
            where: { id: req.params.id }
        });

        // Verificar si el usuario ya tenía una relación en UsuarioGrupo
        const relacionGrupo = await UsuarioGrupoModel.findOne({
            where: { usuarioId: req.params.id }
        });

        if (rolId == JEFE_GPO_ROL_ID) {
            if (relacionGrupo) {
                // Si ya tenía relación, actualizar el grupo
                await UsuarioGrupoModel.update({ grupoId }, { where: { usuarioId: req.params.id } });
            } else {
                // Si no tenía relación, crearla
                await UsuarioGrupoModel.create({ usuarioId: req.params.id, grupoId });
            }
        } else {
            // Si el rol cambió y ya no es JefeGPO, eliminar la relación
            if (relacionGrupo) {
                await UsuarioGrupoModel.destroy({ where: { usuarioId: req.params.id } });
            }
        }

        return res.json(usuarioActualizado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
module.exports.changePassword = async (req, res) => {
    try {
        const usuario = await UsuarioModel.update(
            { password: req.body.password },
            { where: { id: req.params.id } }
        );

        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

module.exports.deleteUsuario = async (req, res) => {
    try {
        await UsuarioGrupoModel.destroy({ where: { usuarioId: req.params.id } });

        const usuario = await UsuarioModel.update(
            { isActive: false },
            { where: { id: req.params.id } }
        );

        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
