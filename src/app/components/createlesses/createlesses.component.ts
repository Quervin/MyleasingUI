import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserRequest } from 'src/app/models/addUserRequest';
import { LesseeResponse } from 'src/app/models/lesseeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createlesses',
  templateUrl: './createLesses.component.html',
  styles: [
  ]
})
export class CreateLessesComponent implements OnInit {

  showPassword1: boolean;
  title1: string;
  type1: string;
  iconClass1: string;
  showPassword2: boolean;
  title2: string;
  type2: string;
  iconClass2: string;
  formLessee: FormGroup;

  addUserRequest: AddUserRequest = {
    Id: 0,
    Address: "",
    Document: "",
    Email: "",
    FirstName: "",
    LastName: "",
    Password: "",
    Phone: "",
    RoleId: 1
  }

  user : UserResponse = {
    id: "",
    document: "",
    address: "",
    email: "",
    firstName: "",
    lastName: "",
    fullName: "",
    fullNameWithDocument: "",
    phone: ""
  }

  lesseeResponse: LesseeResponse = {
    id: 0,
    user : this.user,
    contracts: []
  }

  editMode: boolean;
  id: string;
  button: string;
  titulo: string;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) { 
      this.editMode = false;
      this.id = "";
      this.button = "Crear";
      this.titulo = "Crear Lessee";
      this.showPassword1 = false;
      this.title1 = "Mostrar contraseña";
      this.type1 = "password";
      this.iconClass1 = "fa fa-eye-slash";
      this.showPassword2 = false;
      this.title2 = "Mostrar contraseña";
      this.type2 = "password";
      this.iconClass2 = "fa fa-eye-slash";
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this._activated.params.subscribe( params => {
          this.id = params['id'] != null ? params['id'] : "";
          if (this.id != "") {
            this.editMode = true;
            this.button = "Editar";
            this.titulo = "Editar Lessee";
            this.getLessee();
          }
        });
      }
      if (!this.editMode) {
        this.formLessee = this.fb.group({
          email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
          document: ['', [Validators.required] ],
          firstName: ['', [Validators.required] ],
          lastName: ['', [Validators.required] ],
          address: ['', [Validators.required] ],
          phone: ['', [Validators.required] ],
          password: ['', [Validators.required] ],
          confirmpassword: ['', [Validators.required] ]
        });
      } else {
        this.formLessee = this.fb.group({
          document: ['', [Validators.required] ],
          firstName: ['', [Validators.required] ],
          lastName: ['', [Validators.required] ],
          address: ['', [Validators.required] ],
          phone: ['', [Validators.required] ],
        });
      }
      
    }

  ngOnInit(): void {
  }

  gotoLessee() {
    this._router.navigateByUrl('lessees');
  }
  
  get emailInvalid() {
    return this.formLessee.get('email')?.invalid && this.formLessee.get('email')?.touched;
  }

  get documentInvalid() {
    return this.formLessee.get('document')?.invalid && this.formLessee.get('document')?.touched;
  }

  get firstNameInvalid() {
    return this.formLessee.get('firstName')?.invalid && this.formLessee.get('firstName')?.touched;
  }

  get lastNameInvalid() {
    return this.formLessee.get('lastName')?.invalid && this.formLessee.get('lastName')?.touched;
  }

  get addressInvalid() {
    return this.formLessee.get('address')?.invalid && this.formLessee.get('address')?.touched;
  }

  get phoneInvalid() {
    return this.formLessee.get('phone')?.invalid && this.formLessee.get('phone')?.touched;
  }

  get passwordInvalid() {
    return this.formLessee.get('password')?.invalid && this.formLessee.get('password')?.touched;
  }
  
  get confirmpasswordInvalid() {
    return this.formLessee.get('confirmpassword')?.invalid && this.formLessee.get('confirmpassword')?.touched;
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

  getLessee() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/GetLesseeWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.lesseeResponse = res.result;
        this.setDataFormLessee();
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

  setDataFormLessee() {
    this.formLessee.reset({
      document: this.lesseeResponse.user.document,
      firstName: this.lesseeResponse.user.firstName,
      lastName: this.lesseeResponse.user.lastName,
      address: this.lesseeResponse.user.address,
      phone: this.lesseeResponse.user.phone
    });
    this._myleasing.setLoading(false);
  }

  create() {
    if ( this.formLessee.invalid ) {
      
      return Object.values( this.formLessee.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formLessee.value.password != this.formLessee.value.confirmpassword) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: "La contraseña y el confirmar contraseña deben de ser iguales."
      })
      return;
    }

    this.addUserRequest.Email = this.formLessee.value.email;
    this.addUserRequest.Document = this.formLessee.value.document;
    this.addUserRequest.FirstName = this.formLessee.value.firstName;
    this.addUserRequest.LastName = this.formLessee.value.lastName;
    this.addUserRequest.Address = this.formLessee.value.address;
    this.addUserRequest.Phone = this.formLessee.value.phone;
    this.addUserRequest.Password = this.formLessee.value.password;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Lessees/CreateWeb', this.addUserRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.formLessee.reset({
          document: '',
          firstName: '',
          lastName: '',
          address: '',
          phone: '',
        });
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

  edit() {
    if ( this.formLessee.invalid ) {
      
      return Object.values( this.formLessee.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addUserRequest.Id = this.lesseeResponse.id;
    this.addUserRequest.Email = this.lesseeResponse.user.email;
    this.addUserRequest.Document = this.formLessee.value.document;
    this.addUserRequest.FirstName = this.formLessee.value.firstName;
    this.addUserRequest.LastName = this.formLessee.value.lastName;
    this.addUserRequest.Address = this.formLessee.value.address;
    this.addUserRequest.Phone = this.formLessee.value.phone;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Lessees/EditWeb' , this.addUserRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this._router.navigateByUrl('lessees');
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

  logOut() {
    localStorage.clear();
    this._myleasing.showComponets(true);
    this._router.navigateByUrl('/index');
  }

}
