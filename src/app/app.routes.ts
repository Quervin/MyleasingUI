import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { ManagersComponent } from './components/managers/managers.component';
import { CreatemanagersComponent } from './components/createManagers/createManagers.component';
import { UserComponent } from './components/shared/user/user.component';
import { OwnersComponent } from './components/owners/owners.component';
import { LesseesComponent } from './components/lessees/lessees.component';
import { ContractsComponent } from './components/contracts/contracts.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { DetailsPropertyComponent } from './components/detailsProperties/detailsProperties.component';
import { PropertyTypesComponent } from './components/propertytypes/propertytypes.component';
import { CreatepropertyTypesComponent } from './components/createPropertytypes/createPropertytypes.component';
import { DetailspropertytypesComponent } from './components/detailsPropertytypes/detailsPropertytypes.component';
import { SeachPropertiesComponent } from './components/seachproperties/seachproperties.component';
import { CreatelessesComponent } from './components/createLesses/createLesses.component';
import { DetailslessesComponent } from './components/detailsLesses/detailsLesses.component';
import { DetailsmanagerComponent } from './components/detailsManagers/detailsManagers.component';
import { CreateownersComponent } from './components/createOwners/createOwners.component';
import { DetailsownersComponent } from './components/detailsOwners/detailsOwners.component';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'user', component: UserComponent },
        { path: 'managers', component: ManagersComponent, },
        { path: 'managers/createManager', component: CreatemanagersComponent },
        { path: 'managers/editManager/:id', component: CreatemanagersComponent },
        { path: 'managers/detailsManager/:id', component: DetailsmanagerComponent },
        { path: 'owners', component: OwnersComponent },
        { path: 'owners/createOwner', component: CreateownersComponent },
        { path: 'owners/editOwner/:id', component: CreateownersComponent },
        { path: 'owners/detailsOwner/:id', component: DetailsownersComponent },
        { path: 'lessees', component: LesseesComponent },
        { path: 'lessees/createLessee', component: CreatelessesComponent },
        { path: 'lessees/editLessee/:id', component: CreatelessesComponent },
        { path: 'lessees/detailsLessee/:id', component: DetailslessesComponent },
        { path: 'properties', component: PropertiesComponent },
        { path: 'properties/detailsProperty/:id', component: DetailsPropertyComponent },
        { path: 'propertyTypes', component: PropertyTypesComponent },
        { path: 'propertyTypes/createPropertyTypes', component: CreatepropertyTypesComponent },
        { path: 'propertyTypes/editPropertyTypes/:id', component: CreatepropertyTypesComponent },
        { path: 'propertyTypes/detailsPropertyTypes/:id', component: DetailspropertytypesComponent },
        { path: 'seachProperties', component: SeachPropertiesComponent },
        { path: 'contracts', component: ContractsComponent },
    ], canActivate: [ AuthGuard ] },
    { path: 'index', component: IndexComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent },
    { path: 'detailProperty/:id', component: DetailsPropertyComponent },
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];