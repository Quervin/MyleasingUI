import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
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
  showDetails: boolean = false;
  id: string = "";

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      
      this.showDetail = false;
      this.showDetails = false;
      this._activated.params.subscribe( params => {
        this.id = params['id'];
      });
      if (localStorage.getItem('token') == null) {
        this._myleasing.setLoading(true);
        this.getProperty();
      } else {
        if (this._myleasing.validateToken()) {
          this.logOut();
        } else {
          this.showDetails = true;
          this._myleasing.setLoading(true);
          this.getPropertyDetails();
        }
      }
  }

  ngOnInit(): void {
  }

  getProperty() {
    this._apiService.getLogin(`Properties/GetPropertyWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.property = res.result;
        this.showDetail = true;
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
        this.showDetail = true;
        console.log(this.property);
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
