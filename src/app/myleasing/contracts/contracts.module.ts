import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//Components
import { CreateContractComponent } from './createContract/createContract.component';
import { DetailsContractComponent } from './detailsContract/detailsContract.component';
import { MyContractsComponent } from './myContracts/myContracts.component';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    //components
    MyContractsComponent,
    CreateContractComponent,
    DetailsContractComponent
  ],
  exports:[
    MyContractsComponent,
    CreateContractComponent,
    DetailsContractComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxPaginationModule
  ]
})
export class ContractsModule { }
