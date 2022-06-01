import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';
import { PropertyResponse } from '../../models/propertyResponse';
import { OwnerResponse } from '../../models/ownerResponse';
import { UserResponse } from 'src/app/models/userResponse';
import { PropertyTypeResponse } from '../../models/propertyTypeResponse';

@Component({
  selector: 'app-details-property',
  templateUrl: './detailsProperties.component.html',
  styles: [
  ]
})
export class DetailsPropertyComponent implements OnInit {

  //property = <PropertyResponse>{};
  //property = {} as PropertyResponse;

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
  };
  
  owner: OwnerResponse = {
    id: 0,
    user: this.user,
    properties: [],
    contracts: []
  }

  propertyType: PropertyTypeResponse = {
    id: 0,
    name: "",
    properties: []
  }

  property: PropertyResponse = {
    id: 0,
    neighborhood: "",
    isAvailable: false,
    latitude: 0,
    longitude: 0,
    price: 0,
    address : "",
    firstImage: "",
    remarks: "",
    stratum: 0,
    rooms: 0,
    hasParkingLot: false,
    squareMeters: 0,
    owner: this.owner,
    propertyType: this.propertyType,
    contracts: [],
    propertyImages: [],
  };

  showProperties: boolean;
  id: string = "";
  currentPage: number;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.currentPage = 1;
      this.showProperties = false;
      this._activated.params.subscribe( params => {
        this.id = params['id'];
      });
      if (localStorage.getItem('token') != null) {
        if (this._myleasing.validateToken()) {
          this.logOut();
        } else {
          this.showProperties = true;
          this._myleasing.setLoading(true);
          this.getPropertyDetails();
        }
      } else {
        this._myleasing.setLoading(true);
        this.getProperty();
      }
  }

  ngOnInit(): void {
  }

  getProperty() {
    this._apiService.getLogin(`Properties/GetPropertyWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
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

  getPropertyDetails() {
    this._apiService.getQuery(`Properties/DetailsPropertyWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
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

  logOut() {
    localStorage.clear();
    this._myleasing.showComponets(true);
    this._router.navigateByUrl('/index');
  }

}
