import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }           from './pages/home/home.component';
import { PropDetailPageComponent } from './pages/prop/prop-detail-page/prop-detail-page.component';
import { PrivacidadPageComponent } from './pages/privacidad-page/privacidad-page.component';
import { TermsyCondPageComponent } from './pages/termsy-cond-page/termsy-cond-page.component';
import { NotFoundComponent }       from './pages/not-found/not-found.component';
import { NuevaPropComponent }      from './pages/prop/nueva-prop/nueva-prop.component';
import { SignInComponent }         from './pages/sign-in/sign-in.component';
import { NuevaPropOkComponent }    from './pages/prop/nueva-prop-ok/nueva-prop-ok.component';
import { MiCuentaComponent }       from './pages/mi-cuenta/mi-cuenta.component';
import { SearchComponent }         from './pages/search/search.component';
import {PerfilUsuarioComponent} from './pages/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  { path: '',                component: HomeComponent },
  { path: 'home/:id',        component: HomeComponent },
  { path: 'propiedad/:id',   component: PropDetailPageComponent },
  { path: 'privacidad',      component: PrivacidadPageComponent },
  { path: 'terminos',        component: TermsyCondPageComponent },
  { path: "404",             component: NotFoundComponent },
  { path: "signin",          component: SignInComponent },
  { path: "new-prop",        component: NuevaPropComponent },
  { path: "new-prop-ok",     component: NuevaPropOkComponent },
  { path: "mi-cuenta",       component: MiCuentaComponent },
  { path: "search/:t",       component: SearchComponent },
  { path: 'perfil',          component: PerfilUsuarioComponent },
  { path: "**",              redirectTo: "/404" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
