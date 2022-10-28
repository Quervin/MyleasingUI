import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

///Components
//shared
import { HomeComponent } from './myleasing/shared/home/home.component';
import { DashboardComponent } from './myleasing/shared/dashboard/dashboard.component';
import { UserComponent } from './myleasing/shared/user/user.component';
import { IndexComponent } from './myleasing/shared/index/index.component';
import { LoginComponent } from './myleasing/shared/login/login.component';
import { RegisterComponent } from './myleasing/shared/register/register.component';
import { AboutComponent } from './myleasing/shared/about/about.component';

//managers
import { ListManagersComponent } from './myleasing/managers/listManagers/listManagers.component';
import { CreateManagersComponent } from './myleasing/managers/createManagers/createManagers.component';
import { DetailsManagerComponent } from './myleasing/managers/detailsManagers/detailsManagers.component';

//owners
import { ListOwnersComponent } from './myleasing/owners/listOwners/listOwners.component';
import { CreateOwnersComponent } from './myleasing/owners/createOwners/createOwners.component';
import { DetailsOwnersComponent } from './myleasing/owners/detailsOwners/detailsOwners.component';

//contracts
import { CreateContractComponent } from './myleasing/contracts/createContract/createContract.component';
import { DetailsContractComponent } from './myleasing/contracts/detailsContract/detailsContract.component';
import { MyContractsComponent } from './myleasing/contracts/myContracts/myContracts.component';

//lesses
import { ListLesseesComponent } from './myleasing/lessees/listLessees/listLessees.component';
import { CreateLessesComponent } from './myleasing/lessees/createLesses/createLesses.component';
import { DetailsLessesComponent } from './myleasing/lessees/detailsLesses/detailsLesses.component';

//properties
import { ListPropertiesComponent } from './myleasing/properties/listProperties/listProperties.component';
import { CreatePropertyComponent } from './myleasing/properties/createProperty/createProperty.component';
import { DetailsPropertyComponent } from './myleasing/properties/detailsProperties/detailsProperties.component';
import { SeachPropertiesComponent } from './myleasing/properties/seachproperties/seachproperties.component';
import { MyPropertiesComponent } from './myleasing/properties/myProperties/myProperties.component';

//propertytypes
import { ListPropertyTypesComponent } from './myleasing/propertytypes/listPropertyTypes/listPropertyTypes.component';
import { CreatePropertyTypesComponent } from './myleasing/propertytypes/createPropertytypes/createPropertytypes.component';
import { DetailsPropertytypesComponent } from './myleasing/propertytypes/detailsPropertytypes/detailsPropertytypes.component';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'user', component: UserComponent },
        { path: 'managers', component: ListManagersComponent, },
        { path: 'managers/createManager', component: CreateManagersComponent },
        { path: 'managers/editManager/:id', component: CreateManagersComponent },
        { path: 'managers/detailsManager/:id', component: DetailsManagerComponent },
        { path: 'owners', component: ListOwnersComponent },
        { path: 'owners/createOwner', component: CreateOwnersComponent },
        { path: 'owners/editOwner/:id', component: CreateOwnersComponent },
        { path: 'owners/detailsOwner/:id', component: DetailsOwnersComponent },
        { path: 'owners/createProperty/:ownerId', component: CreatePropertyComponent },
        { path: 'owners/editProperty/:propertyId', component: CreatePropertyComponent },
        { path: 'owners/detailsProperty/:propertyId', component: DetailsPropertyComponent },
        { path: 'owners/createContract/:propertyId', component: CreateContractComponent },
        { path: 'owners/editContract/:contractId', component: CreateContractComponent },
        { path: 'owners/detailsContract/:contractId', component: DetailsContractComponent },
        { path: 'lessees', component: ListLesseesComponent },
        { path: 'lessees/createLessee', component: CreateLessesComponent },
        { path: 'lessees/editLessee/:id', component: CreateLessesComponent },
        { path: 'lessees/detailsLessee/:id', component: DetailsLessesComponent },
        { path: 'lessees/editContract/:id', component: CreateContractComponent },
        { path: 'lessees/detailsContract/:id', component: DetailsContractComponent },
        { path: 'properties', component: ListPropertiesComponent },
        { path: 'properties/detailsProperty/:id', component: DetailsPropertyComponent },
        { path: 'propertyTypes', component: ListPropertyTypesComponent },
        { path: 'propertyTypes/createPropertyTypes', component: CreatePropertyTypesComponent },
        { path: 'propertyTypes/editPropertyTypes/:id', component: CreatePropertyTypesComponent },
        { path: 'propertyTypes/detailsPropertyTypes/:id', component: DetailsPropertytypesComponent },
        { path: 'seachProperties', component: SeachPropertiesComponent },
        { path: 'seachProperties/detailsProperty/:searchPropetyId', component: DetailsPropertyComponent },
        { path: 'myContracts', component: MyContractsComponent },
        { path: 'contracts/detailsContract/:myContractId', component: DetailsContractComponent },
        { path: 'myProperties', component: MyPropertiesComponent },
        { path: 'myProperties/createProperty/:myOwnerId', component: CreatePropertyComponent },
        { path: 'myProperties/editProperty/:myPropertyId', component: CreatePropertyComponent },
        { path: 'myProperties/detailsProperty/:myPropertyId', component: DetailsPropertyComponent },
        { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ], canActivate: [ AuthGuard ] },
    { path: 'index', component: IndexComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent },
    { path: 'detailProperty/:id', component: DetailsPropertyComponent },
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];