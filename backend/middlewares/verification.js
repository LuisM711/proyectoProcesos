module.exports.getData = (req, res) => {
    return new Promise((resolve, reject) => {
        try {
            if (req.session.token) {
                resolve(req.session.token);
            } else {
                reject({ status: 401, message: 'No hay token' });
            }
        } catch (error) {
            reject({ status: 500, message: error.message });
        }
    });
};


module.exports.verifyToken = (req, res, next) => {
    if (req.session.token) {
        return next();
    }
    else {
        return res.status(403).json({ error: 'Debes iniciar sesion' });
    }


}
module.exports.verifyAdmin = (req, res, next) => {
    try {
        if (req.session.token.rolId === 1) {
            return next();
        } else {
            return res.status(401).json({ error: 'No autorizado' });
        }
        
    } catch (error) {
        return res.status(401).json({ error: 'No autorizado' });
        
    }


}