import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { ListOwnersComponent } from './listOwners/listOwners.component';
import { CreateOwnersComponent } from './createOwners/createOwners.component';
import { DetailsOwnersComponent } from './detailsOwners/detailsOwners.component';


@NgModule({
  declarations: [
    //components
    ListOwnersComponent,
    CreateOwnersComponent,
    DetailsOwnersComponent
  ],
  exports: [
    ListOwnersComponent,
    CreateOwnersComponent,
    DetailsOwnersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class OwnersModule { }
