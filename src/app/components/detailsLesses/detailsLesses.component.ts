import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LesseeResponse } from 'src/app/models/lesseeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserResponse } from 'src/app/models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailslesses',
  templateUrl: './detailsLesses.component.html',
  styles: [
  ]
})
export class DetailslessesComponent implements OnInit {

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

  lesseeResponse: LesseeResponse = {
    id: 0,
    user : this.user,
    contracts: []
  }
  
  id: string;
  currentPage: number;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.id = "";
      this.currentPage = 1;
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this._activated.params.subscribe( params => {
          this.id = params['id'];
          this.getDetailsLessee();
        });
      }
    }

  ngOnInit(): void {
  }

  getDetailsLessee() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/DetailsLesseeWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      if (res.isSuccess == true) {
        this.lesseeResponse = res.result;
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

  gotoEditContract(id: number) {
    this._router.navigate([ 'lessees/editContract', id ]);
  }

  gotoDetailsContract(id: number) {
    this._router.navigate([ 'lessees/detailsContract', id ]);
  }

  logOut() {
    localStorage.clear();
    this._myleasing.showComponets(true);
    this._router.navigateByUrl('/index');
  }

}
