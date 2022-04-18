import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyleasingService {
  showLoging: boolean;
  constructor( private _http: HttpClient ) { 
    this.showLoging = false;
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

  updateShowPages() {
    if (localStorage.getItem('token') != null) {
      this.showLoging = true;
    } else {
      this.showLoging = false;
    }
    return this.showLoging;
  }

}
