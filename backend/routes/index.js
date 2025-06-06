const express = require('express');
const router = express.Router();
const verification = require('../middlewares/verification.js');

const loginController = require('../controllers/loginController');
const usuariosController = require('../controllers/usuariosController');
const docentesController = require('../controllers/docentesController');
const gruposController = require('../controllers/gruposController');
const materiasController = require('../controllers/materiasController');
const modulosController = require('../controllers/modulosController');
const registroController = require('../controllers/registroController');
const generalController = require('../controllers/generalController');


module.exports = () => {
    router.get('/', (req, res) => {
        return res.json({ message: 'Bienvenido a la API' });
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
    router.get('/gruposPermitidos', gruposController.getGruposPermitidos);

    router.get('/getRoles', generalController.getRoles);

    router.get('/materias', materiasController.getMaterias);
    router.get('/materiasActivas', materiasController.getMateriasActivas);
    router.post('/materia', materiasController.postMateria);
    router.put('/materia/:id', materiasController.putMateria);
    router.delete('/materia/:id', materiasController.deleteMateria);

    router.get('/modulos/:groupId', modulosController.getModuloByGroup);
    router.get('/getModulos', modulosController.getModulos);
    router.post('/modulo', modulosController.postModulo);
    router.put('/modulo/:id', modulosController.putModulo);
    router.delete('/modulo/:id', modulosController.deleteModulo);

    router.get('/usuarios', usuariosController.getUsuarios);
    router.get('/usuariosActivos', usuariosController.getUsuariosActivos);
    router.post('/usuario', usuariosController.postUsuario);
    router.put('/usuario/:id', usuariosController.putUsuario);
    router.delete('/usuario/:id', usuariosController.deleteUsuario);
    router.post('/changePassword/:id', usuariosController.changePassword);

    router.get('/registros', registroController.getRegistros);
    router.get('/registros/:id', registroController.getRegistroById);
    router.post('/registros', registroController.postRegistro);
    router.put('/registros/:id', registroController.putRegistro);
    router.delete('/registros/:id', registroController.deleteRegistro);
    router.get('/registros/fecha/:fecha', registroController.getRegistrosByFecha);

    router.get('/registros/modulo/:moduloId', registroController.getRegistrosByModulo);
    router.get('/registros/grupo/:grupoId', registroController.getRegistrosByGrupo);
    //getRegistros
    router.get('/modulos/:grupoId/registros-usuario', registroController.getModulosWithUserRegistros);

    router.get('/modulosPorHora', registroController.getModulosByHoraAndFecha);

    router.get('/getAulas', generalController.getAulas);
    router.get('/getCarreras', generalController.getCarreras);
    /**
     * getMisAsistencias(fechaInicio:string, fechaFin:string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/misAsistencias?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, { withCredentials: true });
  }
     */
    router.get('/misAsistencias', registroController.getMisAsistencias);

    return router;
}