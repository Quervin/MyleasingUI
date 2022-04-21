import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MyleasingService } from '../../services/myleasing.service';
import { TokenRequest } from 'src/app/models/tokenRequest';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  tokenRequest: TokenRequest = {
    Username: '',
    Password: ''
  };

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
    }

  ngOnInit(): void {
  }

  login(forma: NgForm) {
  
    if ( forma.invalid ) {

      Object.values( forma.controls ).forEach( control => {
        control.markAsTouched();
      });

      return;
    }

    this.tokenRequest.Username = forma.value.user;
    this.tokenRequest.Password = forma.value.password;

    this._myleasing.setLoading(true);

    this._apiService.postToken('Account/CreateToken' , this.tokenRequest).
    subscribe((res : any) => {
      localStorage.setItem('token', res.token);
      this._router.navigateByUrl('/home');
      this._myleasing.updateShowPages();
      this._myleasing.setLoading(false);
    });
  }
}
