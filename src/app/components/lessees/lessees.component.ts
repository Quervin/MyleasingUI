import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LesseeResponse } from 'src/app/models/lesseeResponse';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lessees',
  templateUrl: './lessees.component.html',
  styles: [
  ]
})
export class LesseesComponent implements OnInit {

  listLessees: LesseeResponse[];
  index: number;
  pageItems: number;
  total: number;
  page: number;
  constructor(private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private _router: Router) { 
    this.listLessees = [];
    this.index = 0;
    this.total = 0;
    this.pageItems = 5;
    this.page = 1;
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
      if ( res.isSuccess == true) {
        this.listLessees = res.result;
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

  editarLessee(id: number) {
    this._router.navigate([ '/detailProperty', id ]);
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

  logOut() {
    localStorage.clear();
    this._myleasing.showComponets(true);
    this._router.navigateByUrl('/index');
  }

}