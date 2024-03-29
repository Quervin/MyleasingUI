import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LesseeResponse } from 'src/app/models/lesseeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-lessees',
  templateUrl: './listLessees.component.html',
  styles: [
  ]
})
export class ListLesseesComponent implements OnInit {

  listLessees: LesseeResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  lesseeId: number;
  deleteLesseeShow: boolean = true;

  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
    this.listLessees = [];
    this.index = 0;
    this.total = 0;
    this.pageItems = 5;
    this.page = 1;
    this.lesseeId = 0;
    if (this._myleasing.validateToken()) {
      this.logOut();
    } else {
      this._myleasing.setLoading(true);
      this.getLessees();
    }
  }

  ngOnInit(): void {
  }

  getLessees(){
    this._apiService.getQuery(`Lessees/GetLesseesWeb/${this.index}/${this.pageItems}`).
    subscribe((res : ResponseRequest) => {
      this._myleasing.setLoading(false);
      if ( res.isSuccess == true) {
        this.listLessees = res.result;
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

  gotoCreateLessee() {
    this._router.navigateByUrl('lessees/createLessee');
  }

  gotoEditLessee(id: number) {
    this._router.navigate([ 'lessees/editLessee', id ]);
  }

  gotoDetailsLessee(id: number) {
    this._router.navigate([ 'lessees/detailsLessee', id ]);
  }

  getPage(pageNum : number){
    this.page = pageNum;

    if (pageNum == 1) {
      this.index = pageNum - 1;
    } else {
      this.index = (pageNum - 1) * this.pageItems;
    }

    this.getLessees();
  }

  showDeleteLessee(id: number) {
    this.lesseeId = id;
    this.deleteLesseeShow = false;
  }

  closeDeleteLeessee() {
    this.deleteLesseeShow = true;
  }

  delete() {
    this.closeDeleteLeessee();
    this._myleasing.setLoading(true);
    this._apiService.getQuery(`Lessees/DeleteWeb/${this.lesseeId}`).
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
