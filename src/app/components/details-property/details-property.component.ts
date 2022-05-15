import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { PropertyResponse } from '../../models/propertyResponse';

@Component({
  selector: 'app-details-property',
  templateUrl: './details-property.component.html',
  styles: [
  ]
})
export class DetailsPropertyComponent implements OnInit {

  //property = <PropertyResponse>{};
  showDetail: boolean;
  property = {} as PropertyResponse;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService) { 
      this.showDetail = false;
      this._activated.params.subscribe( params => {
        this.getProperty(params['id']);
  
      });
  }

  ngOnInit(): void {
  }

  getProperty(id: string) {
    this._apiService.getLogin(`Properties/GetPropertyWeb/${id}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
        this.showDetail = true;
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
  }

}
