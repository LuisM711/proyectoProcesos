const UsuarioModel = require('../models/Usuario.js');

module.exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll(
            {
                include: [
                    {
                        association: 'rol'
                    },
                    {
                        association: 'grupo'
                    }
                ]
            }
        );
        return res.json(usuarios);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.getUsuariosActivos = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.findAll({
            where: {
                isActive : true
            }
        });
        return res.json(usuarios);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.postUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.create(req.body);
        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.putUsuario = async (req, res) => {
    try {
        const usuario = await UsuarioModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.deleteUsuario = async (req, res) => {
    try {
        //isActive false
        const usuario = await UsuarioModel.update({
            isActive: false
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
