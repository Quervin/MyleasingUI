import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { DetailsPropertyComponent } from './components/detailsProperties/detailsProperties.component';

//import Plantilla sakai-ng
import { StyleClassModule } from 'primeng/styleclass';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

//Import Servicios
import { ConfigService } from './services/app.config.service';
import { TopbarComponent } from './components/shared/topbar/topbar.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { MenuitemComponent } from './components/shared/menuitem/menuitem.component';
import { MenuService } from './services/app.menu.service';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { ManagersComponent } from './components/managers/managers.component';
import { CreateManagersComponent } from './components/createManagers/createManagers.component';
import { DetailsManagerComponent } from './components/detailsManagers/detailsManagers.component';
import { OwnersComponent } from './components/owners/owners.component';
import { CreateOwnersComponent } from './components/createOwners/createOwners.component';
import { DetailsOwnersComponent } from './components/detailsOwners/detailsOwners.component';
import { LesseesComponent } from './components/lessees/lessees.component';
import { CreateLessesComponent } from './components/createLesses/createLesses.component';
import { DetailsLessesComponent } from './components/detailsLesses/detailsLesses.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { CreatePropertyComponent } from './components/createProperty/createProperty.component';
import { PropertyTypesComponent } from './components/propertytypes/propertytypes.component';
import { CreatePropertyTypesComponent } from './components/createPropertytypes/createPropertytypes.component';
import { DetailsPropertytypesComponent } from './components/detailsPropertytypes/detailsPropertytypes.component';
import { SeachPropertiesComponent } from './components/seachproperties/seachproperties.component';
import { ContractsComponent } from './components/myContracts/myContracts.component';
import { DetailsContractComponent } from './components/detailsContract/detailsContract.component';
import { CreateContractComponent } from './components/createContract/createContract.component';
import { UserComponent } from './components/shared/user/user.component';
import { MyPropertiesComponent } from './components/myProperties/myProperties.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    IndexComponent,
    FooterComponent,
    RegisterComponent,
    AboutComponent,
    ImagenPipe,
    DetailsPropertyComponent,
    TopbarComponent,
    MenuComponent,
    MenuitemComponent,
    DashboardComponent,
    ManagersComponent,
    OwnersComponent,
    LesseesComponent,
    PropertiesComponent,
    PropertyTypesComponent,
    SeachPropertiesComponent,
    ContractsComponent,
    UserComponent,
    CreatePropertyTypesComponent,
    CreateManagersComponent,
    DetailsPropertytypesComponent,
    CreateLessesComponent,
    DetailsLessesComponent,
    DetailsManagerComponent,
    CreateOwnersComponent,
    DetailsOwnersComponent,
    DetailsContractComponent,
    CreateContractComponent,
    CreatePropertyComponent,
    MyPropertiesComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true , scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'}),
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TagModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    VirtualScrollerModule,
    StyleClassModule,
  ],
  providers: [MenuService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
