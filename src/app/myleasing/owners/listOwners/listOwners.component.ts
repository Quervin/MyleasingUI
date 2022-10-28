import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-owners',
  templateUrl: './listOwners.component.html',
  styles: [
  ]
})
export class ListOwnersComponent implements OnInit {

  listOwners: OwnerResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  ownerId: number;
  deleteOwnerShow:boolean = true;

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.listOwners = [];
      this.index = 0;
      this.total = 0;
      this.pageItems = 5;
      this.page = 1;
      this.ownerId = 0;
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this._myleasing.setLoading(true);
        this.getOwners();
      }
    }

  ngOnInit(): void {
  }

  getOwners(){
    this._apiService.getQuery(`Owners/GetOwnersWeb/${this.index}/${this.pageItems}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.listOwners = res.result;
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

  gotoCreateOwner() {
    this._router.navigateByUrl('owners/createOwner');
  }

  gotoEditOwner(id: number) {
    this._router.navigate([ 'owners/editOwner/', id ]);
  }

  gotoDetailsOwner(id: number) {
    this._router.navigate([ 'owners/detailsOwner', id ]);
  }

  getPage(pageNum : number){
    this.page = pageNum;

    if (pageNum == 1) {
      this.index = pageNum - 1;
    } else {
      this.index = (pageNum - 1) * this.pageItems;
    }

    this.getOwners();
  }

  showDeleteOwner(id: number) {
    this.ownerId = id;
    this.deleteOwnerShow = false;
  }

  closeDeleteOwner() {
    this.deleteOwnerShow = false;
  }

  delete() {
    this.closeDeleteOwner();
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Owners/DeleteWeb/${this.ownerId}`).
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
