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
export class DetailsLessesComponent implements OnInit {

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
  
  id: string = "";
  deleteContractShow: boolean = true;
  currentPage: number;
  contractId: number;

  constructor(private _activated: ActivatedRoute,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.currentPage = 1;
      this.contractId = 0;
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

  gotoLessee() {
    this._router.navigateByUrl('lessees');
  }

  getDetailsLessee() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/DetailsLesseeWeb/${this.id}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if (res.isSuccess == true) {
        this.lesseeResponse = res.result;
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

  gotoEditContract(id: number) {
    this._router.navigate([ 'lessees/editContract', id ]);
  }

  gotoDetailsContract(id: number) {
    this._router.navigate([ 'lessees/detailsContract', id ]);
  }

  showDeleteContract(id: number) {
    this.contractId = id;
    this.deleteContractShow = false;
  }

  closeDeleteContract() {
    this.deleteContractShow = true;
  }

  delete() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/DeleteContractWeb/${this.contractId}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      this.closeDeleteContract();
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
        this.getDetailsLessee();
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
