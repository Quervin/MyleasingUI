import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyResponse } from 'src/app/models/propertyResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [
  ]
})
export class PropertiesComponent implements OnInit {

  listProperties: PropertyResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) {
    this.listProperties = [];
    this.index = 0;
    this.total = 0;
    this.pageItems = 5;
    this.page = 1;
    this._myleasing.setLoading(true);
    this.getProperties();
   }

  ngOnInit(): void {
  }

  getProperties(){
    this._apiService.getQuery(`Properties/GetPropertiesWeb/${this.index}/${this.pageItems}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.listProperties = res.result;
        this.total = res.total;
        this._myleasing.setLoading(false);
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

  editarproperty(id: number) {
    this._router.navigate([ '/detailProperty', id ]);
  }

  getPage(pageNum : number){
    this.page = pageNum;

    if (pageNum == 1) {
      this.index = pageNum - 1;
    } else {
      this.index = (pageNum - 1) * this.pageItems;
    }

    this.getProperties();
  }

}
