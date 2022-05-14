import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseRequest } from '../models/responseRequest';
import { TokenResponse } from '../models/tokenResponse';

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

    return this._http.get<ResponseRequest>(`${ this.url }api/${ query }`, { headers });
  }

  getLogin( query: string) {
    return this._http.get<ResponseRequest>(`${ this.url }api/${ query }`);
  }

  postToken<T>(query: string, object: T) {
    return this._http.post<TokenResponse>(`${ this.url }api/${ query }`, object);
  }

  postQuery<T>(query: string, object: T) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${ token }`
    });

    return this._http.post<ResponseRequest>(`${ this.url }api/${ query }`, object, { headers });
  }

  postLogin<T>(query: string, object: T) {
    return this._http.post<ResponseRequest>(`${ this.url }api/${ query }`, object).pipe();
  }

  isAutenticated() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }
}
