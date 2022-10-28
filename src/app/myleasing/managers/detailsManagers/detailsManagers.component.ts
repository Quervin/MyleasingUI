import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerResponse } from 'src/app/models/managerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailsmanager',
  templateUrl: './detailsManagers.component.html',
  styles: [
  ]
})
export class DetailsManagerComponent implements OnInit {

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

  managerResponse: ManagerResponse = {
    id: 0,
    user : this.user
  }

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
          this.getDetailsManager();
        });
      }
    }

  ngOnInit(): void {
  }

  gotoManager() {
    this._router.navigateByUrl('managers');
  }

  getDetailsManager() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Managers/DetailsManagerWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if (res.isSuccess == true) {
        this.managerResponse = res.result;
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
