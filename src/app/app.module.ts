import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LOCALE_ID } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { NgbModalModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';

import { PropiedadesService } from './providers/propiedades.service';
import { GralInfoService } from './providers/gral-info.service';
import { ZonasService } from './providers/zonas.service';
import { ConfigService } from './providers/config.service';
import { UserService } from './providers/user.service';
import { SiteService } from './providers/site.service';
import { TextsService } from './providers/texts.service';
import { ProfileService } from './providers/profile.service';
import { MercadoPagoService } from './providers/mercado-pago.service';
import { SubscriptionService } from './providers/subscription.service';

import { RegisterModalService } from './components/register-modal/register-modal.service';
import { LoginModalService } from './components/login-modal/login-modal.service';

import { PropDetailPageComponent } from './pages/prop/prop-detail-page/prop-detail-page.component';
import { PrivacidadPageComponent } from './pages/privacidad-page/privacidad-page.component';
import { TermsyCondPageComponent } from './pages/termsy-cond-page/termsy-cond-page.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NuevaPropComponent } from './pages/prop/nueva-prop/nueva-prop.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NuevaPropOkComponent } from './pages/prop/nueva-prop-ok/nueva-prop-ok.component';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { SearchComponent } from './pages/search/search.component';

import { PropiedadFormComponent } from './forms/propiedad-form/propiedad-form.component';
import { SignupFormPComponent } from './forms/signup-form-p/signup-form-p.component';
import { DenunciaPropFormComponent } from './forms/denuncia-prop-form/denuncia-prop-form.component';
import { UserProfileFormComponent } from './forms/user-profile-form/user-profile-form.component';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PropResultComponent } from './components/prop-result/prop-result.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';
import { AlertComponent } from './components/alert/alert.component';
import { DenunciaModalComponent } from './components/denuncia-modal/denuncia-modal.component';
import { SelectPrecioComponent } from './pages/select-precio/select-precio.component';
import { SelectPlanComponent } from './pages/select-plan/select-plan.component';
import { PerfilViewComponent } from './components/perfil-view/perfil-view.component';
import { ImbProfileViewComponent } from './components/imb-profile-view/imb-profile-view.component';
import { UserProfileModalComponent } from './components/user-profile-modal/user-profile-modal.component';
import { EditarPropComponent } from './pages/prop/editar-prop/editar-prop.component';
import { EstadoCuentaComponent } from './components/estado-cuenta/estado-cuenta.component';

import { UserPagosComponent } from './components/user-pagos/user-pagos.component';
import { UserMensajesComponent } from './components/user-mensajes/user-mensajes.component';
import { UserVisitasComponent } from './components/user-visitas/user-visitas.component';

import { MercadoPagoOkComponent } from './pages/MP/mercado-pago-ok/mercado-pago-ok.component';
import { MercadoPagoFailComponent } from './pages/MP/mercado-pago-fail/mercado-pago-fail.component';
import { MercadoPagoPendComponent } from './pages/MP/mercado-pago-pend/mercado-pago-pend.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CreatedAtPipe } from './components/prop-result/created-at.pipe';
import { VerificationComponent } from './pages/verification/verification.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AppliedFiltersService } from './providers/applied-filters.service';
import { FeedComponent } from './components/feed/feed.component';
import {NgxGistModule} from 'ngx-gist/dist/ngx-gist.module';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    HomeComponent,
    FooterComponent,
    PropDetailPageComponent,
    PrivacidadPageComponent,
    TermsyCondPageComponent,
    NotFoundComponent,
    NuevaPropComponent,
    SignInComponent,
    NuevaPropOkComponent,
    PropiedadFormComponent,
    MiCuentaComponent,
    SearchComponent,
    BarraBusquedaComponent,
    PropResultComponent,
    LoginModalComponent,
    PublicProfileComponent,
    RegisterModalComponent,
    SignupFormPComponent,
    AlertComponent,
    DenunciaPropFormComponent,
    DenunciaModalComponent,
    SelectPrecioComponent,
    SelectPlanComponent,
    PerfilViewComponent,
    ImbProfileViewComponent,
    UserProfileFormComponent,
    UserProfileModalComponent,
    EditarPropComponent,
    EstadoCuentaComponent,
    UserPagosComponent,
    UserMensajesComponent,
    UserVisitasComponent,
    MercadoPagoOkComponent,
    MercadoPagoFailComponent,
    MercadoPagoPendComponent,
    CarouselComponent,
    //pipes
    CreatedAtPipe,
    VerificationComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({ apiKey: environment.googleApiKey, libraries: ["places"] }),
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    SweetAlert2Module,
    NgbModalModule,
    NgbCarouselModule,
    NgxGistModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    PropiedadesService,
    GralInfoService,
    ZonasService,
    ConfigService,
    UserService,
    SiteService,
    TextsService,
    RegisterModalService,
    LoginModalService,
    ProfileService,
    MercadoPagoService,
    SubscriptionService,
    AppliedFiltersService
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [NotFoundComponent, NuevaPropComponent, SignInComponent]
})
export class AppModule { }
