import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/myleasing.service';
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
  index: number;
  pageItems: number;
  total: number;
  page: number;

  constructor(private _apiService: ApiService,
    private _router: Router,
    private _myleasing: MyleasingService) { 
    this.listProperties = [];
    this.index = 0;
    this.total = 0;
    this.pageItems = 5;
    this.page = 1;
  }

  ngOnInit(): void {
    if (this._myleasing.goToHome()) {
      this._router.navigateByUrl('/dashboard');
    } 

    this.getPropiedades();
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
        text: error
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
