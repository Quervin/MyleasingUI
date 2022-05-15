import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditUserRequest } from 'src/app/models/editUserRequest';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserRequest } from 'src/app/models/userRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit {
  showPassword1: boolean;
  title1: string;
  type1: string;
  iconClass1: string;
  showPassword2: boolean;
  title2: string;
  type2: string;
  iconClass2: string;
  showPassword3: boolean;
  title3: string;
  type3: string;
  iconClass3: string;
  formUser: FormGroup;

  userResponse: UserResponse = {
    id: "",
    document : "",
    firstName: "",
    address: "",
    fullName: "",
    lastName: "",
    email: "",
    phone: ""
  };

  userRequest: UserRequest = {
    UserId: ""
  };

  editUserRequest: EditUserRequest = {
    Address: "",
    Document: "",
    Email: "",
    FirstName: "",
    LastName: "",
    NewPassword: "",
    OldPassword: "",
    Phone: ""
  };

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) { 
      this.showPassword1 = false;
      this.title1 = "Mostrar contraseña";
      this.type1 = "password";
      this.iconClass1 = "fa fa-eye-slash";
      this.showPassword2 = false;
      this.title2 = "Mostrar contraseña";
      this.type2 = "password";
      this.iconClass2 = "fa fa-eye-slash";
      this.showPassword3 = false;
      this.title3 = "Mostrar contraseña";
      this.type3 = "password";
      this.iconClass3 = "fa fa-eye-slash";
      this.formUser = this.fb.group({
        document: ['', [Validators.required] ],
        firstName: ['', [Validators.required] ],
        lastName: ['', [Validators.required] ],
        address: ['', [Validators.required] ],
        phone: ['', [Validators.required] ],
        currentpasword: ['', [Validators.required] ],
        password: ['', [Validators.required] ],
        confirmpassword: ['', [Validators.required] ],
      });
      
      this.getUser();
  }

  ngOnInit(): void {
  }

  get documentoInvalid() {
    return this.formUser.get('document')?.invalid && this.formUser.get('document')?.touched;
  }

  get firstNameInvalid() {
    return this.formUser.get('firstName')?.invalid && this.formUser.get('firstName')?.touched;
  }

  get lastNameInvalid() {
    return this.formUser.get('lastName')?.invalid && this.formUser.get('lastName')?.touched;
  }

  get addressInvalid() {
    return this.formUser.get('address')?.invalid && this.formUser.get('address')?.touched;
  }

  get phoneInvalid() {
    return this.formUser.get('phone')?.invalid && this.formUser.get('phone')?.touched;
  }

  get currentpaswordValido() {
    return this.formUser.get('currentpasword')?.invalid && this.formUser.get('currentpasword')?.touched;
  }

  get passwordInvalid() {
    return this.formUser.get('password')?.invalid && this.formUser.get('password')?.touched;
  }
  
  get confirmpasswordInvalid() {
    return this.formUser.get('confirmpassword')?.invalid && this.formUser.get('confirmpassword')?.touched;
  }


  mostrarPassword ( id : number ) {
    if(id == 1) {
      if (this.showPassword1 == false) {
        this.title1 = "Ocultar contraseña";
        this.showPassword1 = true;
        this.type1 = "text";
        this.iconClass1 = "fa fa-eye";
      } else {
        this.title1 = "Mostrar contraseña";
        this.showPassword1 = false;
        this.type1 = "password";
        this.iconClass1 = "fa fa-eye-slash";
      }
    } else {

      if (id == 2) {
        if (this.showPassword2 == false) {
          this.title2 = "Ocultar contraseña";
          this.showPassword2 = true;
          this.type2 = "text";
          this.iconClass2 = "fa fa-eye";
        } else {
          this.title2 = "Mostrar contraseña";
          this.showPassword2 = false;
          this.type2 = "password";
          this.iconClass2 = "fa fa-eye-slash";
        }
      } else {
        if (this.showPassword3 == false) {
          this.title3 = "Ocultar contraseña";
          this.showPassword3 = true;
          this.type3 = "text";
          this.iconClass3 = "fa fa-eye";
        } else {
          this.title3 = "Mostrar contraseña";
          this.showPassword3 = false;
          this.type3 = "password";
          this.iconClass3 = "fa fa-eye-slash";
        }
      }
    }
  }

  getUser() {
    this._myleasing.setLoading(true);
    let userId = localStorage.getItem("userId");
    this.userRequest.UserId = userId != null ? userId : "";
    this._apiService.postQuery('Account/GetUserWeb' , this.userRequest).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.userResponse = res.result;
        this.setDataFormUser();
      } else {
        this._myleasing.setLoading(false);
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

  setDataFormUser() {
    this.formUser.reset({
      document: this.userResponse.document,
      firstName: this.userResponse.firstName,
      lastName: this.userResponse.lastName,
      address: this.userResponse.address,
      phone: this.userResponse.phone
    });
    this._myleasing.setLoading(false);
  }

  changeUser() {
    if ( this.formUser.invalid ) {
      
      return Object.values( this.formUser.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formUser.value.password != this.formUser.value.confirmpassword) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: "La contraseña y el confirmar contraseña deben de ser iguales"
      })
      return;
    }
    
    this.editUserRequest.Document = this.formUser.value.document;
    this.editUserRequest.FirstName = this.formUser.value.firstName;
    this.editUserRequest.LastName = this.formUser.value.lastName;
    this.editUserRequest.Address = this.formUser.value.address;
    this.editUserRequest.Phone = this.formUser.value.phone;
    this.editUserRequest.OldPassword = this.formUser.value.currentpasword;
    this.editUserRequest.NewPassword = this.formUser.value.password;
    this.editUserRequest.Email = this.userResponse.email;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Account/ChangeUserWeb' , this.editUserRequest).
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
        this._router.navigateByUrl('/dashboard');
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

}
