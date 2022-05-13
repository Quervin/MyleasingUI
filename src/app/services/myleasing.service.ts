import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyleasingService {
  showLoading: boolean;
  showPages: boolean;
  constructor() { 
    this.showPages = true;
    this.showLoading = false;
  }

  updateShowPages() {
    if (localStorage.getItem('token') != null) {
      this.showPages = false;
    } else {
      this.showPages = true;
    }
    return this.showPages;
  }

  getLoading() {
    return this.showLoading;
  }

  setLoading(changeLoading: boolean ) {
    this.showLoading = changeLoading;
  }
}
