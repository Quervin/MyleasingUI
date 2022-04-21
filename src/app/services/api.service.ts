import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor( private _http: HttpClient ) { 
  }

  getQuery( query: string) {

    const url = `https://myleasinghidalgo.azurewebsites.net/api/${ query }`;

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    return this._http.get( url, { headers });
  }

  postToken<T>(query: string, object: T) {

    const url = `https://myleasinghidalgo.azurewebsites.net/${ query }`;

    return this._http.post( url, object);
  }

  postQuery<T>(query: string, object: T) {

    const url = `https://myleasinghidalgo.azurewebsites.net/api/${ query }`;

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    return this._http.post( url, object, { headers });
  }

  isAutenticated() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
}
