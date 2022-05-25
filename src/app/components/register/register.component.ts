import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { AddUserRequest } from 'src/app/models/addUserRequest';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  showPassword1: boolean;
  title1: string;
  type1: string;
  iconClass1: string;
  showPassword2: boolean;
  title2: string;
  type2: string;
  iconClass2: string;
  formRegister: FormGroup;
  count_month: SelectItem[];
  selectedCount_month= {} as SelectItem;

  userRequest : AddUserRequest = {
    Email: "",
    Document: "",
    FirstName: "",
    LastName: "",
    Address: "",
    Password: "",
    Phone: "",
    RoleId: 0
  }

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private fb: FormBuilder) { 
      this.showPassword1 = false;
      this.title1 = "Mostrar contraseña";
      this.type1 = "password";
      this.iconClass1 = "fa fa-eye-slash";
      this.showPassword2 = false;
      this.title2 = "Mostrar contraseña";
      this.type2 = "password";
      this.iconClass2 = "fa fa-eye-slash";
      this.count_month = [
        {label: 'Lessee', value: "1"},
        {label: 'Owner 2', value: "2"}
      ];

      this.formRegister = this.fb.group({
        email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
        document: ['', [Validators.required] ],
        firstName: ['', [Validators.required] ],
        lastName: ['', [Validators.required] ],
        address: ['', [Validators.required] ],
        phone: ['', [Validators.required] ],
        roleId: ['', [Validators.required] ],
        password: ['', [Validators.required] ],
        confirmpassword: ['', [Validators.required] ],
      });
    }

  ngOnInit(): void {
  }

  get emailInvalid() {
    return this.formRegister.get('email')?.invalid && this.formRegister.get('email')?.touched;
  }

  get documentoInvalid() {
    return this.formRegister.get('document')?.invalid && this.formRegister.get('document')?.touched;
  }

  get firstNameInvalid() {
    return this.formRegister.get('firstName')?.invalid && this.formRegister.get('firstName')?.touched;
  }

  get lastNameInvalid() {
    return this.formRegister.get('lastName')?.invalid && this.formRegister.get('lastName')?.touched;
  }

  get addressInvalid() {
    return this.formRegister.get('address')?.invalid && this.formRegister.get('address')?.touched;
  }

  get phoneInvalid() {
    return this.formRegister.get('phone')?.invalid && this.formRegister.get('phone')?.touched;
  }

  get roleIdValido() {
    return this.formRegister.get('roleId')?.invalid && this.formRegister.get('roleId')?.touched;
  }

  get passwordInvalid() {
    return this.formRegister.get('password')?.invalid && this.formRegister.get('password')?.touched;
  }
  
  get confirmpasswordInvalid() {
    return this.formRegister.get('confirmpassword')?.invalid && this.formRegister.get('confirmpassword')?.touched;
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
    }
  }

  register() {
    if ( this.formRegister.invalid ) {
      
      return Object.values( this.formRegister.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formRegister.value.password != this.formRegister.value.confirmpassword) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: "La contraseña y el confirmar contraseña deben de ser iguales"
      })
      return;
    }

    this.userRequest.Email = this.formRegister.value.email;
    this.userRequest.Document = this.formRegister.value.document;
    this.userRequest.FirstName = this.formRegister.value.firstName;
    this.userRequest.LastName = this.formRegister.value.lastName;
    this.userRequest.Address = this.formRegister.value.address;
    this.userRequest.Phone = this.formRegister.value.phone;
    this.userRequest.Password = this.formRegister.value.password;
    this.userRequest.RoleId = this.formRegister.value.roleId;

    this._myleasing.setLoading(true);

    this._apiService.postLogin('Account/RegisterWeb' , this.userRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        Swal.fire({
          icon: 'success',
          title: 'Resultado con Exitó',
          showConfirmButton: false,
          timer: 2000,
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
}
