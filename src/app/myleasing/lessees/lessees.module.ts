import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { ListLesseesComponent } from './listLessees/listLessees.component';
import { CreateLessesComponent } from './createLesses/createLesses.component';
import { DetailsLessesComponent } from './detailsLesses/detailsLesses.component';


@NgModule({
  declarations: [
    //components
    ListLesseesComponent,
    CreateLessesComponent,
    DetailsLessesComponent
  ],
  exports: [
    ListLesseesComponent,
    CreateLessesComponent,
    DetailsLessesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class LesseesModule { }
