import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import Paginate
import { NgxPaginationModule } from 'ngx-pagination';

//Import Htpp
import { HttpClientModule } from '@angular/common/http';

//importar Rutas
import { ROUTES } from './app.routes';

//Importar Componenetes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { DetailsPropertyComponent } from './components/details-property/details-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoadingComponent,
    NavbarComponent,
    IndexComponent,
    FooterComponent,
    RegisterComponent,
    AboutComponent,
    ImagenPipe,
    DetailsPropertyComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
