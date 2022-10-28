import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { ListManagersComponent } from './listManagers/listManagers.component';
import { CreateManagersComponent } from './createManagers/createManagers.component';
import { DetailsManagerComponent } from './detailsManagers/detailsManagers.component';

//Modules
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    //components
    ListManagersComponent,
    CreateManagersComponent,
    DetailsManagerComponent
  ],
  exports: [
    ListManagersComponent,
    CreateManagersComponent,
    DetailsManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ManagersModule { }
