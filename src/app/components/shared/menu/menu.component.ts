import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  model: any[];
  name: string;
  
  constructor(public home: HomeComponent) { 
    this.name = "Quervin Hidalgo",
    this.model = [];
  }

  ngOnInit(): void {
    this.model = [
      {
          items: [
              {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/home/dashboard']},
              {label: 'FCM', icon: 'pi pi-fw pi-id-card', routerLink: ['/home/cuentas']},
          ]
      },
  ];
  }

}
