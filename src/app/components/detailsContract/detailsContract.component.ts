import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LesseeResponse } from 'src/app/models/lesseeResponse';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { PropertyResponse } from 'src/app/models/propertyResponse';
import { PropertyTypeResponse } from 'src/app/models/propertyTypeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';
import { ContractResponse } from '../../models/contractResponse';

@Component({
  selector: 'app-details-contract',
  templateUrl: './detailsContract.component.html',
  styles: [
  ]
})
export class DetailsContractComponent implements OnInit {

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

  lessee: LesseeResponse = {
    id: 0,
    user : this.user,
    contracts: []
  }

  owner: OwnerResponse = {
    id: 0,
    user : this.user,
    contracts: [],
    properties: []
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

  contractResponse: ContractResponse = {
    id: 0,
    endDate: "",
    startDate: "",
    isActive: false,
    price: 0,
    remarks: "",
    lessee : this.lessee,
    owner: this.owner,
    property: this.property
  }

  id: string;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.id = "";
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this._activated.params.subscribe( params => {
          this.id = params['id'];
          this.getDetailsContract();
        });
      }
    }

  ngOnInit(): void {
  }

  gotoDetailsLessee() {
    this._router.navigate([ 'lessees/detailsLessee', this.contractResponse.lessee.id ]);
  }

  getDetailsContract() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/DetailsContractWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.contractResponse = res.result;
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
