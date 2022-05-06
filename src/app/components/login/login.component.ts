import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MyleasingService } from '../../services/myleasing.service';
import { TokenRequest } from 'src/app/models/tokenRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NgForm } from '@angular/forms';
import { EmailRequest } from '../../models/emailRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  forma: FormGroup;
  forma2: FormGroup;
  
  tokenRequest: TokenRequest = {
    Username: '',
    Password: ''
  };

  emailRequest: EmailRequest = {
    Email: ''
  }

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) { 
      this.forma = this.fb.group({
        username  : ['', [ Validators.required] ],
        password: ['', [Validators.required] ]
      });

      this.forma2 = this.fb.group({
        email  : ['', [ Validators.required] ],
      });
    }

  ngOnInit(): void {
  }

  get userInvalid() {
    return this.forma.get('username')?.invalid && this.forma.get('username')?.touched;
  }

  get passwordInvalid() {
    return this.forma.get('password')?.invalid && this.forma.get('password')?.touched;
  }

  get emailInvalid() {
    return this.forma2.get('email')?.invalid && this.forma2.get('email')?.touched;
  }

  login() {
    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    
    this.tokenRequest.Username = this.forma.value.username;
    this.tokenRequest.Password = this.forma.value.password;

    this._myleasing.setLoading(true);

    this._apiService.postToken('Account/CreateToken' , this.tokenRequest).
    subscribe((res : any) => {
      localStorage.setItem('token', res.token);
      this._router.navigateByUrl('/home');
      this._myleasing.updateShowPages();
      this._myleasing.setLoading(false);
    }, error => {
      console.log(error);
      this._myleasing.setLoading(false);
    });
  }

  recoverPassword() {
    if ( this.forma2.invalid ) {
      
      return Object.values( this.forma2.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    this.emailRequest.Email = this.forma2.value.email;

    this._myleasing.setLoading(true);

    this._apiService.postLogin('Account/RecoverPasswordWeb' , this.emailRequest).
    subscribe((res : any) => {
      console.log(res);
      this._myleasing.setLoading(false);
    }, error => {
      console.log(error);
      this._myleasing.setLoading(false);
    });
  }

  // login(forma: NgForm) {
  
  //   if ( forma.invalid ) {

  //     Object.values( forma.controls ).forEach( control => {
  //       control.markAsTouched();
  //     });

  //     return;
  //   }

  //   this.tokenRequest.Username = forma.value.user;
  //   this.tokenRequest.Password = forma.value.password;

  //   this._myleasing.setLoading(true);

  //   this._apiService.postToken('Account/CreateToken' , this.tokenRequest).
  //   subscribe((res : any) => {
  //     localStorage.setItem('token', res.token);
  //     this._router.navigateByUrl('/home');
  //     this._myleasing.updateShowPages();
  //     this._myleasing.setLoading(false);
  //   });
  // }
}
