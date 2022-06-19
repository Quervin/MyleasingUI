import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import { TokenRequest } from 'src/app/models/tokenRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NgForm } from '@angular/forms';
import { EmailRequest } from '../../models/emailRequest';
import Swal from 'sweetalert2';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { TokenResponse } from 'src/app/models/tokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;
  formPassword: FormGroup;
  showPassword: boolean;
  title: string;
  type: string;
  iconClass: string;
  
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
      this.title = "Mostrar contraseña";
      this.showPassword = false;
      this.type = "password";
      this.iconClass = "fa fa-eye-slash";

      this.formLogin = this.fb.group({
        username  : ['', [ Validators.required] ],
        password: ['', [Validators.required] ]
      });

      this.formPassword = this.fb.group({
        email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      });
    }

  ngOnInit(): void {
  }

  get userInvalid() {
    return this.formLogin.get('username')?.invalid && this.formLogin.get('username')?.touched;
  }

  get passwordInvalid() {
    return this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched;
  }

  get emailInvalid() {
    return this.formPassword.get('email')?.invalid && this.formPassword.get('email')?.touched;
  }

  mostrarPassword () {
    if (this.showPassword == false) {
      this.title = "Ocultar contraseña";
      this.showPassword = true;
      this.type = "text";
      this.iconClass = "fa fa-eye";
    } else {
      this.title = "Mostrar contraseña";
      this.showPassword = false;
      this.type = "password";
      this.iconClass = "fa fa-eye-slash";
    }
  }

  login() {
    if ( this.formLogin.invalid ) {

      return Object.values( this.formLogin.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    
    this.tokenRequest.Username = this.formLogin.value.username;
    this.tokenRequest.Password = this.formLogin.value.password;

    this._myleasing.setLoading(true);

    this._apiService.postToken('Account/CreateTokenWeb' , this.tokenRequest).
    subscribe((res : TokenResponse) => {
      if (res.isSuccess == true) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('expiration', res.expiration.toString());
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('rolId',  res.rolId);
        this._myleasing.setLoading(false);
        this._router.navigateByUrl('/dashboard');
      } else {
        this._myleasing.setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Usuario o contraseña no valido"
        })
      }
    }, error => {
      this._myleasing.setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
  }

  recoverPassword() {
    if ( this.formPassword.invalid ) {
      
      return Object.values( this.formPassword.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    
    this.emailRequest.Email = this.formPassword.value.email;

    this._myleasing.setLoading(true);

    this._apiService.postLogin('Account/RecoverPasswordWeb' , this.emailRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2500,
          text: res.message
        }
        )
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      this._myleasing.setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
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
