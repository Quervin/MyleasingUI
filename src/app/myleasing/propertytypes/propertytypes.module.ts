import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

//Components
import { ListPropertyTypesComponent } from './listPropertyTypes/listPropertyTypes.component';
import { CreatePropertyTypesComponent } from './createPropertytypes/createPropertytypes.component';
import { DetailsPropertytypesComponent } from './detailsPropertytypes/detailsPropertytypes.component';
import { ImagenPipe } from './pipes/imagen.pipe';


@NgModule({
  declarations: [
    //components
    ListPropertyTypesComponent,
    CreatePropertyTypesComponent,
    DetailsPropertytypesComponent,

    //pipes
    ImagenPipe
  ],
  exports: [
    ListPropertyTypesComponent,
    CreatePropertyTypesComponent,
    DetailsPropertytypesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PropertytypesModule { }
