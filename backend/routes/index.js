const express = require('express');
const router = express.Router();

const docentesController = require('../controllers/docentesController');
const gruposController = require('../controllers/gruposController');
const materiasController = require('../controllers/materiasController');
const modulosController = require('../controllers/modulosController');

module.exports = () => {
    router.get('/', (req, res) => {
        res.json({ message: 'Bienvenido a la API' });
    });


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

    router.get('/materias', materiasController.getMaterias);
    router.get('/materiasActivas', materiasController.getMateriasActivas);
    router.post('/materia', materiasController.postMateria);
    router.put('/materia/:id', materiasController.putMateria);
    router.delete('/materia/:id', materiasController.deleteMateria);

    router.get('/modulos', modulosController.getModulos);
    router.post('/modulo', modulosController.postModulo);
    router.put('/modulo/:id', modulosController.putModulo);
    router.delete('/modulo/:id', modulosController.deleteModulo);



    return router;
}