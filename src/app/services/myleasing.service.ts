import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyleasingService {
  showLoading: boolean;
  showComponents: boolean;
  goto: boolean;
  expirationDate: number;
  validate: boolean;

  constructor() { 
    this.showComponents = true;
    this.showLoading = false;
    this.goto = false;
    this.validate = false;
    this.expirationDate = 0;
  }

  updateShowComponents()  {
    if (localStorage.getItem('token') != null) {
      this.showComponents = false;
    } else {
      this.showComponents = true;
    }
    return this.showComponents;
  }

  goToHome(){
    if (localStorage.getItem('token') != null) {
      this.goto = true;
    }
    return this.goto;
  }

  validateToken() {

    let expiration = localStorage.getItem('expiration');
    this.expirationDate = Date.parse(expiration != null ? expiration : "");
    if (Date.now() > this.expirationDate) {
      this.validate = true;
    } else {
      this.validate = false;
    }
    return this.validate;
  }

  getLoading() {
    return this.showLoading;
  }

  setLoading(changeLoading: boolean ) {
    this.showLoading = changeLoading;
  }
}
