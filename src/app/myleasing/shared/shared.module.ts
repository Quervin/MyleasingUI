import { NgModule } from '@angular/core';

//Modules
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { RouterModule } from '@angular/router';
import { PropertiesModule } from '../properties/properties.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

//Routes
import { ROUTES } from '../../app.routes';

//Components
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MenuitemComponent } from './menuitem/menuitem.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { TopbarComponent } from './topbar/topbar.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AboutComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    IndexComponent,
    LoginComponent,
    MenuComponent,
    MenuitemComponent,
    NavbarComponent,
    RegisterComponent,
    TopbarComponent,
    UserComponent
  ],
  exports: [
    AboutComponent,
    DashboardComponent,
    FooterComponent,
    HomeComponent,
    IndexComponent,
    LoginComponent,
    MenuComponent,
    MenuitemComponent,
    NavbarComponent,
    RegisterComponent,
    TopbarComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    PropertiesModule,
    DropdownModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true , scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'}),
  ]
})
export class SharedModule { }
