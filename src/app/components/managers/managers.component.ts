import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerResponse } from 'src/app/models/managerResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styles: [
  ]
})
export class ManagersComponent implements OnInit {
  
  listManagers: ManagerResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  managerId: number;
  deleteManagerShow:boolean = true;

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
      this.listManagers = [];
      this.index = 0;
      this.total = 0;
      this.pageItems = 5;
      this.page = 1;
      this.managerId = 0;
      if (this._myleasing.validateToken()) {
        this.logOut();
      } else {
        this._myleasing.setLoading(true);
        this.getManagers();
      }
  }

  ngOnInit(): void {
  }

  getManagers(){
    this._apiService.getQuery(`Managers/GetManagersWeb/${this.index}/${this.pageItems}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.listManagers = res.result;
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

  gotoCreateManager() {
    this._router.navigateByUrl('managers/createManager');
  }

  gotoEditManager(id: number) {
    this._router.navigate([ 'managers/editManager', id ]);
  }

  gotoDetailsManager(id: number) {
    this._router.navigate([ 'managers/detailsManager', id ]);
  }

  getPage(pageNum : number){
    this.page = pageNum;

    if (pageNum == 1) {
      this.index = pageNum - 1;
    } else {
      this.index = (pageNum - 1) * this.pageItems;
    }

    this.getManagers();
  }

  showDeleteManager(id: number) {
    this.managerId = id;
    this.deleteManagerShow = false;
  }

  closeDeleteManager() {
    this.deleteManagerShow = true;
  }

  delete() {
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Managers/DeleteWeb/${this.managerId}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      this.closeDeleteManager();
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
