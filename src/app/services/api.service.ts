import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string;
  constructor( private _http: HttpClient ) { 
    this.url = environment.urlBase;
  }

  getQuery( query: string) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    return this._http.get(`${ this.url }api/${ query }`, { headers });
  }

  postToken<T>(query: string, object: T) {
    return this._http.post(`${ this.url }${ query }`, object);
  }

  postQuery<T>(query: string, object: T) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    return this._http.post(`${ this.url }api/${ query }`, object, { headers });
  }

  postLogin<T>(query: string, object: T) {
    return this._http.post(`${ this.url }api/${ query }`, object);
  }

  isAutenticated() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
}
