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
  //    router.get('/grupos', gruposController.getGrupos);
  getGrupos(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/grupos`, { withCredentials: true });
  }
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




}