import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddPropertyTypeRequest } from 'src/app/models/addPropertyTypeRequest';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createmanagers',
  templateUrl: './createmanagers.component.html',
  styles: [
  ]
})
export class CreatemanagersComponent implements OnInit {

  formPropertyType: FormGroup;

  addPropertyTypeRequest: AddPropertyTypeRequest = {
    Id: 0,
    Name: ""
  }

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private fb: FormBuilder) { 
      this.formPropertyType = this.fb.group({
        name: ['', [Validators.required] ],
      });
    }

  ngOnInit(): void {
  }

  get nameInvalid() {
    return this.formPropertyType.get('name')?.invalid && this.formPropertyType.get('name')?.touched;
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

    this._apiService.postQuery('PropertyTypes/CreateWeb' , this.addPropertyTypeRequest).
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
