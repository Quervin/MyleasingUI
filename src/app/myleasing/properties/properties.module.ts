import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

//Components
import { ListPropertiesComponent } from './listProperties/listProperties.component';
import { CreatePropertyComponent } from './createProperty/createProperty.component';
import { DetailsPropertyComponent } from './detailsProperties/detailsProperties.component';
import { MyPropertiesComponent } from './myProperties/myProperties.component';
import { SeachPropertiesComponent } from './seachproperties/seachproperties.component';
import { ImagenPipe } from './pipes/imagen.pipe';


@NgModule({
  declarations: [
    //components
    ListPropertiesComponent,
    CreatePropertyComponent,
    DetailsPropertyComponent,
    MyPropertiesComponent,
    SeachPropertiesComponent,

    //pipes
    ImagenPipe
  ],
  exports: [
    ListPropertiesComponent,
    CreatePropertyComponent,
    DetailsPropertyComponent,
    MyPropertiesComponent,
    SeachPropertiesComponent,
    ImagenPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxPaginationModule
  ]
})
export class PropertiesModule { }
