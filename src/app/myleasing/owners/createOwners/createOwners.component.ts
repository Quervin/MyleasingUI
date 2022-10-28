import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserRequest } from 'src/app/models/addUserRequest';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createowners',
  templateUrl: './createOwners.component.html',
  styles: [
  ]
})
export class CreateOwnersComponent implements OnInit {

  showPassword1: boolean;
  title1: string;
  type1: string;
  iconClass1: string;
  showPassword2: boolean;
  title2: string;
  type2: string;
  iconClass2: string;
  formOwner: FormGroup;

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

  ownerResponse: OwnerResponse = {
    id: 0,
    user : this.user,
    contracts: [],
    properties: []
  }

  editMode: boolean;
  id: string = "";
  button: string;
  titulo: string;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) { 
      this.editMode = false;
      this.button = "Crear";
      this.titulo = "Crear Owner";
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
            this.titulo = "Editar Owner";
            this.getOwner();
          }
        });
      }
      if (!this.editMode) {
        this.formOwner = this.fb.group({
          email: ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
          document: ['', [Validators.required] ],
          firstName: ['', [Validators.required] ],
          lastName: ['', [Validators.required] ],
          address: ['', [Validators.required] ],
          phone: ['', [Validators.required] ],
          password: ['', [Validators.required] ],
          confirmpassword: ['', [Validators.required] ]
        });
      } else {
        this.formOwner = this.fb.group({
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

  gotoOwner() {
    this._router.navigateByUrl('owners');
  }

  get emailInvalid() {
    return this.formOwner.get('email')?.invalid && this.formOwner.get('email')?.touched;
  }

  get documentInvalid() {
    return this.formOwner.get('document')?.invalid && this.formOwner.get('document')?.touched;
  }

  get firstNameInvalid() {
    return this.formOwner.get('firstName')?.invalid && this.formOwner.get('firstName')?.touched;
  }

  get lastNameInvalid() {
    return this.formOwner.get('lastName')?.invalid && this.formOwner.get('lastName')?.touched;
  }

  get addressInvalid() {
    return this.formOwner.get('address')?.invalid && this.formOwner.get('address')?.touched;
  }

  get phoneInvalid() {
    return this.formOwner.get('phone')?.invalid && this.formOwner.get('phone')?.touched;
  }

  get passwordInvalid() {
    return this.formOwner.get('password')?.invalid && this.formOwner.get('password')?.touched;
  }
  
  get confirmpasswordInvalid() {
    return this.formOwner.get('confirmpassword')?.invalid && this.formOwner.get('confirmpassword')?.touched;
  }

  // Only Integer Numbers
  keyPressNumbers(event: any) {
    let charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
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

  getOwner() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Owners/GetOwnerWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.ownerResponse = res.result;
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
    this.formOwner.reset({
      document: this.ownerResponse.user.document,
      firstName: this.ownerResponse.user.firstName,
      lastName: this.ownerResponse.user.lastName,
      address: this.ownerResponse.user.address,
      phone: this.ownerResponse.user.phone
    });
    this._myleasing.setLoading(false);
  }

  create() {
    if ( this.formOwner.invalid ) {
      
      return Object.values( this.formOwner.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formOwner.value.password != this.formOwner.value.confirmpassword) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: "La contraseña y el confirmar contraseña deben de ser iguales."
      })
      return;
    }

    this.addUserRequest.Email = this.formOwner.value.email;
    this.addUserRequest.Document = this.formOwner.value.document;
    this.addUserRequest.FirstName = this.formOwner.value.firstName;
    this.addUserRequest.LastName = this.formOwner.value.lastName;
    this.addUserRequest.Address = this.formOwner.value.address;
    this.addUserRequest.Phone = this.formOwner.value.phone;
    this.addUserRequest.Password = this.formOwner.value.password;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Owners/CreateWeb', this.addUserRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.formOwner.reset({
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
    if ( this.formOwner.invalid ) {
      
      return Object.values( this.formOwner.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addUserRequest.Id = this.ownerResponse.id;
    this.addUserRequest.Email = this.ownerResponse.user.email;
    this.addUserRequest.Document = this.formOwner.value.document;
    this.addUserRequest.FirstName = this.formOwner.value.firstName;
    this.addUserRequest.LastName = this.formOwner.value.lastName;
    this.addUserRequest.Address = this.formOwner.value.address;
    this.addUserRequest.Phone = this.formOwner.value.phone;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('Owners/EditWeb' , this.addUserRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this._router.navigateByUrl('owners');
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
