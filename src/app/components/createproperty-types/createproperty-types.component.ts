import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddPropertyTypeRequest } from 'src/app/models/addPropertyTypeRequest';
import { PropertyTypeResponse } from 'src/app/models/propertyTypeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createproperty-types',
  templateUrl: './createproperty-types.component.html',
  styles: [
  ]
})
export class CreatepropertyTypesComponent implements OnInit {

  formPropertyType: FormGroup;

  addPropertyTypeRequest: AddPropertyTypeRequest = {
    Id: 0,
    Name: ""
  }

  propertyTypeResponse: PropertyTypeResponse = {
    id: 0,
    name: "",
    properties: []
  }


  editMode: boolean;
  id: string;
  button: string;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router,
    private fb: FormBuilder) {
      this.formPropertyType = this.fb.group({
        name: ['', [Validators.required] ],
      });
      this.editMode = false;
      this.id = "";
      this.button = "Crear"
      this._activated.params.subscribe( params => {
        this.id = params['id'] != null ? params['id'] : "";
        if (this.id != "") {
          this.editMode = true;
          this.button = "Editar";
          this.getPropertyType(this.id);
        }
      });

     }

  ngOnInit(): void {
  }

  get nameInvalid() {
    return this.formPropertyType.get('name')?.invalid && this.formPropertyType.get('name')?.touched;
  }

  getPropertyType ( id: string ) {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`PropertyTypes/GetPropertyTypeWeb/${id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.propertyTypeResponse = res.result;
        this.setDataFormPropertyType();
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

  setDataFormPropertyType() {
    this.formPropertyType.reset({
      name: this.propertyTypeResponse.name
    });
    this._myleasing.setLoading(false);
  }

  create() {
    if ( this.formPropertyType.invalid ) {
      
      return Object.values( this.formPropertyType.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addPropertyTypeRequest.Name = this.formPropertyType.value.name;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('PropertyTypes/CreateWeb', this.addPropertyTypeRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.formPropertyType.reset({
          name: ''
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
    if ( this.formPropertyType.invalid ) {
      
      return Object.values( this.formPropertyType.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }

    this.addPropertyTypeRequest.Name = this.formPropertyType.value.name;
    this.addPropertyTypeRequest.Id = this.propertyTypeResponse.id;

    this._myleasing.setLoading(true);

    this._apiService.postQuery('PropertyTypes/EditWeb' , this.addPropertyTypeRequest).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this._router.navigateByUrl('propertyTypes');
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
