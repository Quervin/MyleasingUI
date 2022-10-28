import { NgModule } from '@angular/core';

//Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContractsModule } from './myleasing/contracts/contracts.module';
import { LesseesModule } from './myleasing/lessees/lessees.module';
import { OwnersModule } from './myleasing/owners/owners.module';
import { ManagersModule } from './myleasing/managers/managers.module';
import { PropertiesModule } from './myleasing/properties/properties.module';
import { PropertytypesModule } from './myleasing/propertytypes/propertytypes.module';
import { SharedModule } from './myleasing/shared/shared.module';
import { RouterModule } from '@angular/router';

//Htpp
import { HttpClientModule } from '@angular/common/http';

//Routes
import { ROUTES } from './app.routes';

//AppComponent
import { AppComponent } from './app.component';

//Services
import { ConfigService } from './services/app.config.service';
import { MenuService } from './services/app.menu.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ContractsModule,
    LesseesModule,
    ManagersModule,
    OwnersModule,
    PropertiesModule,
    PropertytypesModule,
    SharedModule,
    RouterModule.forRoot(ROUTES, { useHash: true , scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
  ],
  providers: [MenuService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
