import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyResponse } from 'src/app/models/propertyResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seach-properties',
  templateUrl: './seach-properties.component.html',
  styles: [
  ]
})
export class SeachPropertiesComponent implements OnInit {

  listProperties: PropertyResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  constructor(private _apiService: ApiService,
    private _router: Router) {
      this.listProperties = [];
      this.index = 0;
      this.total = 0;
      this.pageItems = 5;
      this.page = 1;
      this.getPropiedades();
     }

  ngOnInit(): void {
  }

  getPropiedades(){
    this._apiService.getLogin(`Properties/GetListPropertiesWeb/${this.index}/${this.pageItems}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.listProperties = res.result;
        this.total = res.total;
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

  verPropiedad(id: number) {
    this._router.navigate([ '/detailProperty', id ]);
  }

  getPage(pageNum : number){
    this.page = pageNum;

    if (pageNum == 1) {
      this.index = pageNum - 1;
    } else {
      this.index = (pageNum - 1) * this.pageItems;
    }

    this.getPropiedades();
  }

}
