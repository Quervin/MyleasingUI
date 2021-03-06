import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyResponse } from 'src/app/models/propertyResponse';
import { PropertyTypeResponse } from 'src/app/models/propertyTypeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailspropertytypes',
  templateUrl: './detailsPropertytypes.component.html',
  styles: [
  ]
})
export class DetailsPropertytypesComponent implements OnInit {

  propertyTypeResponse: PropertyTypeResponse = {
    id: 0,
    name: "",
    properties: []
  };

  id: string = "";

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) {
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this._activated.params.subscribe( params => {
          this.id = params['id'];
          this.getDetailsPropertyType();
        });
      }
     }

  ngOnInit(): void {
  }

  gotoPropertyType() {
    this._router.navigateByUrl('propertyTypes');
  }
  
  getDetailsPropertyType () {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`PropertyTypes/DetailsPropertiesTypeWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if (res.isSuccess == true) {
        this.propertyTypeResponse = res.result;
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
