const express = require('express');
const router = express.Router();
const verification = require('../middlewares/verification.js');

const loginController = require('../controllers/loginController');
const usuariosController = require('../controllers/usuariosController');
const docentesController = require('../controllers/docentesController');
const gruposController = require('../controllers/gruposController');
const materiasController = require('../controllers/materiasController');
const modulosController = require('../controllers/modulosController');
const generalController = require('../controllers/generalController');

module.exports = () => {
    router.get('/', (req, res) => {
        res.json({ message: 'Bienvenido a la API' });
    });


    router.get('/getInfo', verification.getInfo);
    router.get('/horas', generalController.getHoras);
    router.post('/login', loginController.login);
    router.get('/logout', loginController.logout);

    router.get('/docentes', docentesController.getDocentes);
    router.get('/docentesActivos', docentesController.getDocentesActivos);
    router.post('/docente', docentesController.postDocente);
    router.put('/docente/:id', docentesController.putDocente);
    router.delete('/docente/:id', docentesController.deleteDocente);

    router.get('/grupos', gruposController.getGrupos);
    router.get('/gruposActivos', gruposController.getGruposActivos);
    router.post('/grupo', gruposController.postGrupo);
    router.put('/grupo/:id', gruposController.putGrupo);
    router.delete('/grupo/:id', gruposController.deleteGrupo);

    router.get('/getRoles', generalController.getRoles);

    router.get('/materias', materiasController.getMaterias);
    router.get('/materiasActivas', materiasController.getMateriasActivas);
    router.post('/materia', materiasController.postMateria);
    router.put('/materia/:id', materiasController.putMateria);
    router.delete('/materia/:id', materiasController.deleteMateria);

    router.get('/modulos/:groupId', modulosController.getModuloByGroup);

    router.post('/modulo', modulosController.postModulo);
    router.put('/modulo/:id', modulosController.putModulo);
    router.delete('/modulo/:id', modulosController.deleteModulo);

    router.get('/usuarios', usuariosController.getUsuarios);
    router.get('/usuariosActivos', usuariosController.getUsuariosActivos);
    router.post('/usuario', usuariosController.postUsuario);
    router.put('/usuario/:id', usuariosController.putUsuario);
    router.delete('/usuario/:id', usuariosController.deleteUsuario);


    return router;
}