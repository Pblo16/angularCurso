import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataTable } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<IDataTable[]> {
    return this.http.get<IDataTable[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<IDataTable> {
    return this.http.get<IDataTable>(`${this.apiUrl}/${id}`);  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateUsuario(id: number, userData: { name: string, email: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }
}
