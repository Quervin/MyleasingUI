import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { UserResponse } from '../../../models/userResponse';
import { ApiService } from 'src/app/services/api.service';
import { MyleasingService } from 'src/app/services/app.myleasing.service';
import Swal from 'sweetalert2';
import { ResponseRequest } from 'src/app/models/responseRequest';
import { UserRequest } from '../../../models/userRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  model: any[];
  items: any[];

  userResponse: UserResponse = {
    id: "",
    document : "",
    firstName: "",
    address: "",
    fullName: "",
    fullNameWithDocument: "",
    lastName: "",
    email: "",
    phone: ""
  };

  userRequest: UserRequest = {
    UserId: ""
  };

 
  
  constructor(public home: HomeComponent,
    private _apiService: ApiService,
    private _myleasing: MyleasingService,
    private fb: FormBuilder) { 
    this.model = [];
    this.items = this.setMenu();
    this.getUser();
    
  }

  ngOnInit(): void {
    this.model = [
      {
          items: this.items
      },
  ];
  }

  getUser() {
    let userId = localStorage.getItem("userId");
    this.userRequest.UserId = userId != null ? userId : "";
    this._apiService.postQuery('Account/GetUserWeb' , this.userRequest).
    subscribe((res : ResponseRequest) => {
      if ( res.isSuccess == true) {
        this.userResponse = res.result;
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: res.message
        })
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Ha ocurrido un error"
      })
    });
  }

  setMenu() {
    if (this._myleasing.getRol() == "Manager") {
      this.items =  [
        {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']},
        {label: 'Managers', icon: 'pi pi-fw pi-id-card', routerLink: ['/managers']},
        {label: 'Owners', icon: 'pi pi-fw pi-id-card', routerLink: ['/owners']},
        {label: 'Lessees', icon: 'pi pi-fw pi-id-card', routerLink: ['/lessees']},
        {label: 'Properties', icon: 'pi pi-fw pi-id-card', routerLink: ['/properties']},
        {label: 'PropertyTypes', icon: 'pi pi-fw pi-id-card', routerLink: ['/propertyTypes']},
      ]
    }

    if (this._myleasing.getRol() == "Owner") {
      this.items =  [
        {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']},
        {label: 'SeachProperties', icon: 'pi pi-fw pi-id-card', routerLink: ['/seachProperties']},
        {label: 'MyProperties', icon: 'pi pi-fw pi-id-card', routerLink: ['/properties']},
        {label: 'MyContracts', icon: 'pi pi-fw pi-id-card', routerLink: ['/contracts']},
      ]
    }

    if (this._myleasing.getRol() == "Lessee") {
      this.items =  [
        {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/dashboard']},
        {label: 'SeachProperties', icon: 'pi pi-fw pi-id-card', routerLink: ['/seachProperties']},
        {label: 'MyContracts', icon: 'pi pi-fw pi-id-card', routerLink: ['/contracts']},
      ]
    }

  return this.items;
  }

}
