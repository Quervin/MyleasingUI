import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  year;
  constructor() {
    this.year = new Date().getFullYear();
   }

  ngOnInit(): void {
  }

}
