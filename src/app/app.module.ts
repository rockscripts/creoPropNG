import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule }         from '@angular/common/http';
import { FormsModule }              from '@angular/forms';

import { AppComponent }      from './app.component';
import { AppRoutingModule }  from './app-routing.module';

import { PropiedadesService }   from './providers/propiedades.service';
import { GralInfoService }      from './providers/gral-info.service';
import { ZonasService }         from './providers/zonas.service';
import { ConfigService }        from './providers/config.service';
import { UserService }          from './providers/user.service';

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

import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';
import { MainMenuComponent }      from './components/main-menu/main-menu.component';
import { FooterComponent }        from './components/footer/footer.component';
import { PropResultComponent } from './components/prop-result/prop-result.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';
import { SignupFormBComponent } from './forms/signup-form-b/signup-form-b.component';
import { SignupFormPComponent } from './forms/signup-form-p/signup-form-p.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { AlertComponent } from './components/alert/alert.component';
import { DenunciaPropFormComponent } from './forms/denuncia-prop-form/denuncia-prop-form.component';
import { DenunciaModalComponent } from './components/denuncia-modal/denuncia-modal.component';

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
    DenunciaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule
  ],
  providers: [
    PropiedadesService,
    GralInfoService,
    ZonasService,
    ConfigService,
    UserService
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [NotFoundComponent, NuevaPropComponent, SignInComponent]
})
export class AppModule { }
