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

}