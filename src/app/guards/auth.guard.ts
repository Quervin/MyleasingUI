import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private _apiService: ApiService,
    private _router: Router) {}
  canActivate(): boolean {
    if ( this._apiService.isAutenticated()) {
      return true;
    } else {
      this._router.navigateByUrl('/index');
      return false;
    }
  }
  
}
