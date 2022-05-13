import { Component, OnInit } from '@angular/core';
import { TokenResponse } from 'src/app/models/tokenResponse';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
//   template: `
//   <div class="layout-menu-container">
//       <div class="text-center mb-5">
//           <h1>Myleasing</h1>
//           <img src="assets/layout/images/avatar.png" alt="Image" height="50" class="mb-3">
//           <div class="text-900 text-3xl font-medium mb-3"></div>
//           <span class="text-600 font-medium">{{name}}</span> <i class="pi pi-cog"></i>
//       </div>
//       <ul class="layout-menu" role="menu">
//           <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
//               <ul role="menu">
//                   <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
//               </ul>
//           </li>
//       </ul>
//   </div>
// `,
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  model: any[];
  name: string;
  tokenResponse: TokenResponse = {
    token: '',
    expiration: ''
  };
  
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
