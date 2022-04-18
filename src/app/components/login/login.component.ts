import { Component, OnInit } from '@angular/core';
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

  constructor(private _myleasing: MyleasingService) { 
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

    this._myleasing.postToken('Account/CreateToken' , this.tokenRequest).
    subscribe((res : any) => {
      localStorage.setItem('token', res.token);
      this._myleasing.updateShowPages();
    });
  }
}
