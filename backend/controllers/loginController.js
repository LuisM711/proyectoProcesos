const UsuarioModel = require('../models/Usuario.js');

module.exports.login = async (req, res) => {
    try {
        const { numeroDeCuenta, password } = req.body;
        const usuario = await UsuarioModel.findOne({
            where: {
                numeroDeCuenta,
                password,
                isActive: true
            }
        });
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        req.session.token = usuario;
        // console.log(req.session.token);
        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
module.exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.json({ message: 'Sesión cerrada' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
