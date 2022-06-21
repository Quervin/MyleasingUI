import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { ManagersComponent } from './components/managers/managers.component';
import { CreateManagersComponent } from './components/createManagers/createManagers.component';
import { DetailsManagerComponent } from './components/detailsManagers/detailsManagers.component';
import { UserComponent } from './components/shared/user/user.component';
import { OwnersComponent } from './components/owners/owners.component';
import { CreateOwnersComponent } from './components/createOwners/createOwners.component';
import { DetailsOwnersComponent } from './components/detailsOwners/detailsOwners.component';
import { LesseesComponent } from './components/lessees/lessees.component';
import { CreateLessesComponent } from './components/createLesses/createLesses.component';
import { DetailsLessesComponent } from './components/detailsLesses/detailsLesses.component';
import { ContractsComponent } from './components/myContracts/myContracts.component';
import { CreateContractComponent } from './components/createContract/createContract.component';
import { DetailsContractComponent } from './components/detailsContract/detailsContract.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { CreatePropertyComponent } from './components/createProperty/createProperty.component';
import { DetailsPropertyComponent } from './components/detailsProperties/detailsProperties.component';
import { PropertyTypesComponent } from './components/propertytypes/propertytypes.component';
import { CreatePropertyTypesComponent } from './components/createPropertytypes/createPropertytypes.component';
import { DetailsPropertytypesComponent } from './components/detailsPropertytypes/detailsPropertytypes.component';
import { SeachPropertiesComponent } from './components/seachproperties/seachproperties.component';
import { MyPropertiesComponent } from './components/myProperties/myProperties.component';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'user', component: UserComponent },
        { path: 'managers', component: ManagersComponent, },
        { path: 'managers/createManager', component: CreateManagersComponent },
        { path: 'managers/editManager/:id', component: CreateManagersComponent },
        { path: 'managers/detailsManager/:id', component: DetailsManagerComponent },
        { path: 'owners', component: OwnersComponent },
        { path: 'owners/createOwner', component: CreateOwnersComponent },
        { path: 'owners/editOwner/:id', component: CreateOwnersComponent },
        { path: 'owners/detailsOwner/:id', component: DetailsOwnersComponent },
        { path: 'owners/createProperty/:ownerId', component: CreatePropertyComponent },
        { path: 'owners/editProperty/:propertyId', component: CreatePropertyComponent },
        { path: 'owners/detailsProperty/:propertyId', component: DetailsPropertyComponent },
        { path: 'owners/createContract/:propertyId', component: CreateContractComponent },
        { path: 'owners/editContract/:contractId', component: CreateContractComponent },
        { path: 'owners/detailsContract/:contractId', component: DetailsContractComponent },
        { path: 'lessees', component: LesseesComponent },
        { path: 'lessees/createLessee', component: CreateLessesComponent },
        { path: 'lessees/editLessee/:id', component: CreateLessesComponent },
        { path: 'lessees/detailsLessee/:id', component: DetailsLessesComponent },
        { path: 'lessees/editContract/:id', component: CreateContractComponent },
        { path: 'lessees/detailsContract/:id', component: DetailsContractComponent },
        { path: 'properties', component: PropertiesComponent },
        { path: 'properties/detailsProperty/:id', component: DetailsPropertyComponent },
        { path: 'propertyTypes', component: PropertyTypesComponent },
        { path: 'propertyTypes/createPropertyTypes', component: CreatePropertyTypesComponent },
        { path: 'propertyTypes/editPropertyTypes/:id', component: CreatePropertyTypesComponent },
        { path: 'propertyTypes/detailsPropertyTypes/:id', component: DetailsPropertytypesComponent },
        { path: 'seachProperties', component: SeachPropertiesComponent },
        { path: 'seachProperties/detailsProperty/:searchPropetyId', component: DetailsPropertyComponent },
        { path: 'myContracts', component: ContractsComponent },
        { path: 'contracts/detailsContract/:myContractId', component: DetailsContractComponent },
        { path: 'myProperties', component: MyPropertiesComponent },
        { path: 'myProperties/createProperty/:myOwnerId', component: CreatePropertyComponent },
        { path: 'myProperties/editProperty/:myPropertyId', component: CreatePropertyComponent },
        { path: 'myProperties/detailsProperty/:myPropertyId', component: DetailsPropertyComponent },
    ], canActivate: [ AuthGuard ] },
    { path: 'index', component: IndexComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent },
    { path: 'detailProperty/:id', component: DetailsPropertyComponent },
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];