import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { IUsuario } from '../interfaces/iusuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  api = 'https://5f5a727f28ad7a0016055d52.mockapi.io/users';

  constructor(private http: HttpClient) {
    //console.log('servicio usuarios listo');
  }

  getUsuarios() {

    return this.http.get(this.api, httpOptions)
      .pipe(map(data => data));

  }

  getUsuario(id: string) {

    return this.http.get(`${this.api}/${id}`)
      .pipe(map(data => data));

  }

  deleteUsuario(user: IUsuario): Observable<{}> {
    const url = `${this.api}/${user.id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addUsuario(user: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.api, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  putUsuario(user: IUsuario): Observable<IUsuario> {
    const url = `${this.api}/${user.id}`;
    return this.http.put<IUsuario>(url, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error: ', error.error.message);
    } else {
      console.error(`El webservice retornó el código ${error.status}, el cuerpo del mensaje es: ${error.message}`);
    }
    return throwError({status: error.status, message: 'Por favor intente más tarde'});
  }

}
