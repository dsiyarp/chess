import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

import { IUsuario } from '../interfaces/iusuario';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {
    //console.log('servicio usuarios listo');
  }

  getQuery( query: string ) {

    const url = `https://5f5a727f28ad7a0016055d52.mockapi.io/users${ query }`;

    return this.http.get(url, httpOptions);

  }

  getUsuarios() {

    return this.getQuery('')
              .pipe( map( data => data ));

  }

  getUsuario(id: string) {

    return this.getQuery(`/${id}`)
              .pipe( map( data => data ));

  }

  deleteUsuario(user: IUsuario):Observable<{}> {
    const url = `https://5f5a727f28ad7a0016055d52.mockapi.io/users/${user.id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  addUsuario(user: IUsuario):Observable<IUsuario> {
    const url = `https://5f5a727f28ad7a0016055d52.mockapi.io/users`;
    return this.http.post<IUsuario>(url, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  putUsuario(user: IUsuario):Observable<IUsuario> {
    console.log(user);
    const url = `https://5f5a727f28ad7a0016055d52.mockapi.io/users/${user.id}`;
    return this.http.put<IUsuario>(url, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('Ocurrió un error: ', error.error.message);
    }else{
      console.error(`El webservice retornó el código ${error.status}, El cuerpo del mensaje es: ${error.message}`);
    }
    return throwError('Por favor intente más tarde');
  }

}
