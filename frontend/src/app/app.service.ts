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
  //router.get('/modulos/:groupId', modulosController.getModuloByGroup);
  getModulosByGroup(id: number): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/modulos/${id}`, { withCredentials: true });
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

  

}