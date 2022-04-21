import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: HomeComponent },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];