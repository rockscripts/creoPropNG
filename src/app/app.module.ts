import { BrowserModule }                   from '@angular/platform-browser';
import { NgModule }                        from '@angular/core';
import { AngularFontAwesomeModule }        from 'angular-font-awesome';
import { HttpClientModule }                from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LOCALE_ID }                       from '@angular/core';
import { AgmCoreModule }                   from '@agm/core';

import { AppComponent }      from './app.component';
import { AppRoutingModule }  from './app-routing.module';

import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import { PropiedadesService }   from './providers/propiedades.service';
import { GralInfoService }      from './providers/gral-info.service';
import { ZonasService }         from './providers/zonas.service';
import { ConfigService }        from './providers/config.service';
import { UserService }          from './providers/user.service';
import { SiteService }          from './providers/site.service';
import { TextsService }         from './providers/texts.service';
import { ProfileService }       from './providers/profile.service';

import { PropDetailPageComponent } from './pages/prop/prop-detail-page/prop-detail-page.component';
import { PrivacidadPageComponent } from './pages/privacidad-page/privacidad-page.component';
import { TermsyCondPageComponent } from './pages/termsy-cond-page/termsy-cond-page.component';
import { HomeComponent }           from './pages/home/home.component';
import { NotFoundComponent }       from './pages/not-found/not-found.component';
import { NuevaPropComponent }      from './pages/prop/nueva-prop/nueva-prop.component';
import { SignInComponent }         from './pages/sign-in/sign-in.component';
import { NuevaPropOkComponent }    from './pages/prop/nueva-prop-ok/nueva-prop-ok.component';
import { MiCuentaComponent }       from './pages/mi-cuenta/mi-cuenta.component';
import { SearchComponent }         from './pages/search/search.component';

import { PropiedadFormComponent }  from './forms/propiedad-form/propiedad-form.component';

import { BarraBusquedaComponent }    from './components/barra-busqueda/barra-busqueda.component';
import { MainMenuComponent }         from './components/main-menu/main-menu.component';
import { FooterComponent }           from './components/footer/footer.component';
import { PropResultComponent }       from './components/prop-result/prop-result.component';
import { LoginModalComponent }       from './components/login-modal/login-modal.component';
import { RegisterModalComponent }    from './components/register-modal/register-modal.component';
import { SignupFormBComponent }      from './forms/signup-form-b/signup-form-b.component';
import { SignupFormPComponent }      from './forms/signup-form-p/signup-form-p.component';
import { PerfilUsuarioComponent }    from './pages/perfil-usuario/perfil-usuario.component';
import { AlertComponent }            from './components/alert/alert.component';
import { DenunciaPropFormComponent } from './forms/denuncia-prop-form/denuncia-prop-form.component';
import { DenunciaModalComponent }    from './components/denuncia-modal/denuncia-modal.component';
import { SelectPrecioComponent }     from './pages/select-precio/select-precio.component';
import { SelectPlanComponent }       from './pages/select-plan/select-plan.component';
import { PerfilViewComponent }       from './components/perfil-view/perfil-view.component';
import { ImbProfileViewComponent }   from './components/imb-profile-view/imb-profile-view.component';
import { UserProfileFormComponent }  from './forms/user-profile-form/user-profile-form.component';
import { UserProfileModalComponent } from './components/user-profile-modal/user-profile-modal.component';

import localeEs from '@angular/common/locales/es';
import { EditarPropComponent } from './pages/prop/editar-prop/editar-prop.component';
registerLocaleData(localeEs);

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
    PerfilUsuarioComponent,
    RegisterModalComponent,
    SignupFormBComponent,
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
    EditarPropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyD2ohKHAfu3LTRtftC37oMAmy2ldJ1a4Gg', libraries: ["places"] }),
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    PropiedadesService,
    GralInfoService,
    ZonasService,
    ConfigService,
    UserService,
    SiteService,
    TextsService,
    ProfileService
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [NotFoundComponent, NuevaPropComponent, SignInComponent]
})
export class AppModule { }
