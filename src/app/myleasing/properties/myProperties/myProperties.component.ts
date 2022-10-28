import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-properties',
  templateUrl: './myProperties.component.html',
  styles: [
  ]
})
export class MyPropertiesComponent implements OnInit {

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

  currentPage: number;
  propertyId: number;
  deletePropertyShow:boolean = true;

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.currentPage = 1;
      this.propertyId = 0;
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this.getMyProperties();
      }
    }

  ngOnInit(): void {
  }

  getMyProperties() {
    this._myleasing.setLoading(true);
    let userId = localStorage.getItem("userId");
    this._apiService.getQuery(`Owners/GetMyPropertiesWeb/${userId}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.ownerResponse = res.result;
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

  gotoEditProperty(id: number) {
    this._router.navigate([ 'myProperties/editProperty', id ]);
 
  }
  gotoCreateProperty() {
    this._router.navigate([ 'myProperties/createProperty', this.ownerResponse.id ]);
  }

  gotoDetailsProperty(id: number) {
    this._router.navigate([ 'myProperties/detailsProperty', id ]);
  }

  showDeleteProperty(id: number) {
    this.propertyId = id;
    this.deletePropertyShow = false;
  }

  closeDeleteProperty() {
    this.deletePropertyShow = true;
  }

  delete() {
    this.closeDeleteProperty();
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Owners/DeletePropertyWeb/${this.propertyId}`).
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
        this.currentPage = 1;
        this.getMyProperties();
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
