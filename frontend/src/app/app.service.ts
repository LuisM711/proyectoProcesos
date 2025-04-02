import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './app.environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }


  login(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/login`, data, { withCredentials: true });
  }
  getInfo(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/getInfo`, { withCredentials: true });
  }
  logout(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/logout`, { withCredentials: true });
  }
  //router.get('/usuarios', usuariosController.getUsuarios);
  getUsuarios(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/usuarios`, { withCredentials: true });
  }
  getRoles(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/getRoles`, { withCredentials: true });
  }
  //    router.get('/materiasActivas', materiasController.getMateriasActivas);

  getMateriasActivas(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/materiasActivas`, { withCredentials: true });
  }
  //    router.get('/gruposActivos', gruposController.getGruposActivos);



  //    router.get('/grupos', gruposController.getGrupos);

  //router.put('/usuario/:id', usuariosController.putUsuario);
  updateUsuario(data: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/usuario/${data.id}`, data, { withCredentials: true });
  }
  //router.post('/usuario', usuariosController.postUsuario);
  createUsuario(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/usuario`, data, { withCredentials: true });
  }
  //router.delete('/usuario/:id', usuariosController.deleteUsuario);
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/usuario/${id}`, { withCredentials: true });
  }
  //router.get('/horas', generalController.getHoras);
  getHoras(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/horas`, { withCredentials: true });
  }
  //router.get('/materias', materiasController.getMaterias);
  getMaterias(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/materias`, { withCredentials: true });
  }
  //router.get('/docentes', docentesController.getDocentes);
  getDocentes(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/docentes`, { withCredentials: true });
  }
  /*
  router.post('/materia', materiasController.postMateria);
    router.put('/materia/:id', materiasController.putMateria);
    router.delete('/materia/:id', materiasController.deleteMateria);
  */
  addMateria(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/materia`, data, { withCredentials: true });
  }
  updateMateria(data: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/materia/${data.id}`, data, { withCredentials: true });
  }
  deleteMateria(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/materia/${id}`, { withCredentials: true });
  }
  /**
   * router.get('/docentes', docentesController.getDocentes);
    router.get('/docentesActivos', docentesController.getDocentesActivos);
    router.post('/docente', docentesController.postDocente);
    router.put('/docente/:id', docentesController.putDocente);
    router.delete('/docente/:id', docentesController.deleteDocente);
   */
  getDocentesActivos(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/docentesActivos`, { withCredentials: true });
  }
  addDocente(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/docente`, data, { withCredentials: true });
  }
  updateDocente(data: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/docente/${data.id}`, data, { withCredentials: true });
  }
  deleteDocente(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/docente/${id}`, { withCredentials: true });
  }
  /**
   * router.get('/modulos/:groupId', modulosController.getModuloByGroup);
    router.post('/modulo', modulosController.postModulo);
    router.put('/modulo/:id', modulosController.putModulo);
    router.delete('/modulo/:id', modulosController.deleteModulo);
   */
  getModulosByGroup(id: number): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/modulos/${id}`, { withCredentials: true });
  }
  addModulo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/modulo`, data, { withCredentials: true });
  }
  updateModulo(data: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/modulo/${data.id}`, data, { withCredentials: true });
  }
  deleteModulo(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/modulo/${id}`, { withCredentials: true });
  }
  /**
   * router.get('/registros', registroController.getRegistros);
    router.get('/registros/:id', registroController.getRegistroById);
    router.post('/registros', registroController.postRegistro);
    router.put('/registros/:id', registroController.putRegistro);
    router.delete('/registros/:id', registroController.deleteRegistro);
    router.get('/registros/fecha/:fecha', registroController.getRegistrosByFecha);
    router.get('/registros/modulo/:moduloId', registroController.getRegistrosByModulo);
    router.get('/registros/grupo/:grupoId', registroController.getRegistrosByGrupo);
    router.get('/registros/grupo/:grupoId/usuario/:usuarioId', registroController.getRegistroByGrupoAndUser);
   */
  getRegistros(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/registros`, { withCredentials: true });
  }
  getRegistroById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/registros/${id}`, { withCredentials: true });
  }
  addRegistro(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/registros`, data, { withCredentials: true });
  }
  updateRegistro(data: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/registros/${data.id}`, data, { withCredentials: true });
  }
  deleteRegistro(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/registros/${id}`, { withCredentials: true });
  }
  getRegistrosByFecha(fecha: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/registros/fecha/${fecha}`, { withCredentials: true });
  }
  getRegistrosByModulo(moduloId: number): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/registros/modulo/${moduloId}`, { withCredentials: true });
  }
  getRegistrosByGrupo(grupoId: number, fecha: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/registros/grupo/${grupoId}?fecha=${fecha}`, { withCredentials: true });
  }
  getModulosWithUserRegistros(grupoId: number, fecha: string): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/modulos/${grupoId}/registros-usuario?fecha=${fecha}`, { withCredentials: true });
  }
  //    router.get('/gruposPermitidos', gruposController.getGruposPermitidos);

  getGruposPermitidos(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/gruposPermitidos`, { withCredentials: true });
  }
  //    router.post('/changePassword/:id', usuariosController.changePassword);
  changePassword(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/changePassword/${data.id}`, data, { withCredentials: true });
  }
  /**
   * router.get('/grupos', gruposController.getGrupos);
      router.get('/gruposActivos', gruposController.getGruposActivos);
      router.post('/grupo', gruposController.postGrupo);
      router.put('/grupo/:id', gruposController.putGrupo);
      router.delete('/grupo/:id', gruposController.deleteGrupo);
   */
  getGrupos(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/grupos`, { withCredentials: true });
  }
  getGruposActivos(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/gruposActivos`, { withCredentials: true });
  }
  addGrupo(data: any): Observable<any> {
    return this.http.post<any>(`${environment.backendUrl}/grupo`, data, { withCredentials: true });
  }
  updateGrupo(data: any): Observable<any> {
    return this.http.put<any>(`${environment.backendUrl}/grupo/${data.id}`, data, { withCredentials: true });
  }
  deleteGrupo(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.backendUrl}/grupo/${id}`, { withCredentials: true });
  }
  /**
   * router.get('/getAulas', generalController.getAulas);
    router.get('/getCarreras', generalController.getCarreras);
   */
  getAulas(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/getAulas`, { withCredentials: true });
  }
  getCarreras(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/getCarreras`, { withCredentials: true });
  }

}