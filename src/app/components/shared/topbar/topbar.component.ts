import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styles: [
  ]
})
export class TopbarComponent implements OnInit {

  constructor(public home: HomeComponent) { }

  ngOnInit(): void {
  }

}
