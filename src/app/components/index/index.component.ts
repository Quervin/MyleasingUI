import { Component, OnInit } from '@angular/core';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { PropertyResponse } from '../../models/propertyResponse';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  listProperties: PropertyResponse[];

  constructor(private _apiService: ApiService) { 
    this.listProperties = [];
  }

  ngOnInit(): void {
    this._apiService.getLogin("Properties/GetListPropertiesWeb").
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.listProperties = res.result;
        console.log(this.listProperties);
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
        text: error
      })
    });
  }

}
