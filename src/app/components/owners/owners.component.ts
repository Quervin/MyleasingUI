import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerResponse } from 'src/app/models/ownerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styles: [
  ]
})
export class OwnersComponent implements OnInit {

  listOwners: OwnerResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.listOwners = [];
      this.index = 0;
      this.total = 0;
      this.pageItems = 5;
      this.page = 1;
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
      if ( res.isSuccess == true) {
        this.listOwners = res.result;
        this.total = res.total;
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

  editarOwner(id: number) {
    this._router.navigate([ '/detailProperty', id ]);
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

  logOut() {
    localStorage.clear();
    this._myleasing.showComponets(true);
    this._router.navigateByUrl('/index');
  }

}