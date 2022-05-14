import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { DetailsPropertyComponent } from './components/details-property/details-property.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';


export const ROUTES: Routes = [
    { path: '', component: HomeComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'cuentas', component: AboutComponent },
    ], canActivate: [ AuthGuard ] },
    { path: 'index', component: IndexComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent },
    { path: 'detailProperty/:id', component: DetailsPropertyComponent },
    { path: '', pathMatch: 'full', redirectTo: 'index' },
    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];