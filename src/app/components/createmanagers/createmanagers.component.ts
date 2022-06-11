import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPropertyTypeRequest } from 'src/app/models/addPropertyTypeRequest';
import { AddUserRequest } from 'src/app/models/addUserRequest';
import { ManagerResponse } from 'src/app/models/managerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createmanagers',
  templateUrl: './createManagers.component.html',
  styles: [
  ]
})
export class CreateManagersComponent implements OnInit {

  showPassword1: boolean;
  title1: string;
  type1: string;
  iconClass1: string;
  showPassword2: boolean;
  title2: string;
  type2: string;
  iconClass2: string;
  formManager: FormGroup;

  addUserRequest: AddUserRequest = {
    Id: 0,
    Address: "",
    Document: "",
    Email: "",
    FirstName: "",
    LastName: "",
    Password: "",
    Phone: "",
    RoleId: 3
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

  managerResponse: ManagerResponse = {
    id: 0,
    user : this.user
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
      this.titulo = "Crear Manager";
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
            this.titulo = "Editar Manager";
            this.getManager();
          }
        });
      }
      if (!this.editMode) {
        this.formManager = this.fb.group({
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
        this.formManager = this.fb.group({
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

  gotoManager() {
    this._router.navigateByUrl('managers');
  }

  get emailInvalid() {
    return this.formManager.get('email')?.invalid && this.formManager.get('email')?.touched;
  }

  get documentInvalid() {
    return this.formManager.get('document')?.invalid && this.formManager.get('document')?.touched;
  }

  get firstNameInvalid() {
    return this.formManager.get('firstName')?.invalid && this.formManager.get('firstName')?.touched;
  }

  get lastNameInvalid() {
    return this.formManager.get('lastName')?.invalid && this.formManager.get('lastName')?.touched;
  }

  get addressInvalid() {
    return this.formManager.get('address')?.invalid && this.formManager.get('address')?.touched;
  }

  get phoneInvalid() {
    return this.formManager.get('phone')?.invalid && this.formManager.get('phone')?.touched;
  }

  get passwordInvalid() {
    return this.formManager.get('password')?.invalid && this.formManager.get('password')?.touched;
  }
  
  get confirmpasswordInvalid() {
    return this.formManager.get('confirmpassword')?.invalid && this.formManager.get('confirmpassword')?.touched;
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

  getManager() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Managers/GetManagerWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.managerResponse = res.result;
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
    this.formManager.reset({
      document: this.managerResponse.user.document,
      firstName: this.managerResponse.user.firstName,
      lastName: this.managerResponse.user.lastName,
      address: this.managerResponse.user.address,
      phone: this.managerResponse.user.phone
    });
    this._myleasing.setLoading(false);
  }

  create() {
    if ( this.formManager.invalid ) {
      
      return Object.values( this.formManager.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formManager.value.password != this.formManager.value.confirmpassword) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: "La contraseña y el confirmar contraseña deben de ser iguales."
      })
      return;
    }

    this.addUserRequest.Email = this.formManager.value.email;
    this.addUserRequest.Document = this.formManager.value.document;
    this.addUserRequest.FirstName = this.formManager.value.firstName;
    this.addUserRequest.LastName = this.formManager.value.lastName;
    this.addUserRequest.Address = this.formManager.value.address;
    this.addUserRequest.Phone = this.formManager.value.phone;
    this.addUserRequest.Password = this.formManager.value.password;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Managers/CreateWeb', this.addUserRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.formManager.reset({
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
    if ( this.formManager.invalid ) {
      
      return Object.values( this.formManager.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addUserRequest.Id = this.managerResponse.id;
    this.addUserRequest.Email = this.managerResponse.user.email;
    this.addUserRequest.Document = this.formManager.value.document;
    this.addUserRequest.FirstName = this.formManager.value.firstName;
    this.addUserRequest.LastName = this.formManager.value.lastName;
    this.addUserRequest.Address = this.formManager.value.address;
    this.addUserRequest.Phone = this.formManager.value.phone;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Managers/EditWeb' , this.addUserRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this._router.navigateByUrl('managers');
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
