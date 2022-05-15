import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyleasingService } from 'src/app/services/app.myleasing.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {

  constructor(private _router: Router,
    private _myleasing: MyleasingService) { 
      if (this._myleasing.goToHome()) {
        this._router.navigateByUrl('/dashboard');
      } 
  }

  ngOnInit(): void {
  }

}
