import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyTypeResponse } from 'src/app/models/propertyTypeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-property-types',
  templateUrl: './listPropertyTypes.component.html',
  styles: [
  ]
})
export class ListPropertyTypesComponent implements OnInit {

  listPropertyType: PropertyTypeResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  propertyTypeId: number;
  deletePropertyShow: boolean = true;

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) {
    this.listPropertyType = [];
    this.index = 0;
    this.total = 0;
    this.pageItems = 5;
    this.page = 1;
    this.propertyTypeId = 0;
    if (this._myleasing.validateToken()) {
      this.logOut();
    } else {
      this._myleasing.setLoading(true);
      this.getPropertyTypes();
    }
   }

  ngOnInit(): void {
  }

  getPropertyTypes(){
    this._apiService.getQuery(`PropertyTypes/GetPropertiesTypeWeb/${this.index}/${this.pageItems}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.listPropertyType = res.result;
        this.total = res.total;
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

  gotoCreatePropertyType() {
    this._router.navigateByUrl('propertyTypes/createPropertyTypes');
  }

  gotoEditPropertyType(id: number) {
    this._router.navigate([ 'propertyTypes/editPropertyTypes', id ]);
  }

  gotoDetailsPropertyType(id: number) {
    this._router.navigate([ 'propertyTypes/detailsPropertyTypes', id ]);
  }

  getPage(pageNum : number){
    this.page = pageNum;

    if (pageNum == 1) {
      this.index = pageNum - 1;
    } else {
      this.index = (pageNum - 1) * this.pageItems;
    }

    this.getPropertyTypes();
  }

  showDeleteProperty(id: number) {
    this.propertyTypeId = id;
    this.deletePropertyShow = false;
  }

  closeDeleteProperty() {
    this.deletePropertyShow = true;
  }

  delete() {
    this.closeDeleteProperty();
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`PropertyTypes/DeleteWeb/${this.propertyTypeId}`).
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
        this.getPage(1);
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
