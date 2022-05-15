import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyleasingService {
  showLoading: boolean;
  showComponents: boolean;
  goto: boolean;
  expirationDate: number;
  validate: boolean;

  // Observable string sources
  private showComponentsSource = new Subject<boolean>();

  // Observable string streams
  showComponents$ = this.showComponentsSource.asObservable();

  constructor() { 
    this.showComponents = true;
    this.showLoading = false;
    this.goto = false;
    this.validate = false;
    this.expirationDate = 0;
  }

   // Service boolean commands
  showComponets(show: boolean) {
    this.showComponentsSource.next(show);
  }

  getShowComponents()  {
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

  getRol() {
    let rolId = localStorage.getItem("rolId");
    return rolId;
  }

  getLoading() {
    return this.showLoading;
  }

  setLoading(changeLoading: boolean) {
    this.showLoading = changeLoading;
  }
}
