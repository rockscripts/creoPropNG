import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { PropDetailPageComponent } from './pages/prop/prop-detail-page/prop-detail-page.component';
import { PrivacidadPageComponent } from './pages/privacidad-page/privacidad-page.component';
import { TermsyCondPageComponent } from './pages/termsy-cond-page/termsy-cond-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NuevaPropComponent } from './pages/prop/nueva-prop/nueva-prop.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NuevaPropOkComponent } from './pages/prop/nueva-prop-ok/nueva-prop-ok.component';
import { MiCuentaComponent } from './pages/mi-cuenta/mi-cuenta.component';
import { SearchComponent } from './pages/search/search.component';
import { PublicProfileComponent } from './pages/public-profile/public-profile.component';
import { SelectPrecioComponent } from './pages/select-precio/select-precio.component';
import { SelectPlanComponent } from './pages/select-plan/select-plan.component';
import { EditarPropComponent } from './pages/prop/editar-prop/editar-prop.component';

import { MercadoPagoOkComponent } from './pages/MP/mercado-pago-ok/mercado-pago-ok.component';
import { MercadoPagoFailComponent } from './pages/MP/mercado-pago-fail/mercado-pago-fail.component';
import { MercadoPagoPendComponent } from './pages/MP/mercado-pago-pend/mercado-pago-pend.component';
import { VerificationComponent } from './pages/verification/verification.component';
import {FeedComponent} from './components/feed/feed.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'propiedad/:id', component: PropDetailPageComponent },
  { path: 'propiedad/edit/:id', component: EditarPropComponent, canActivate: [AuthGuard] },
  { path: 'privacidad', component: PrivacidadPageComponent },
  { path: 'terminos', component: TermsyCondPageComponent },
  { path: "404", component: NotFoundComponent },
  { path: "signin", component: SignInComponent },
  { path: "new-prop", component: NuevaPropComponent, canActivate: [AuthGuard] },
  { path: "new-prop-ok", component: NuevaPropOkComponent, canActivate: [AuthGuard] },
  { path: "mi-cuenta", component: MiCuentaComponent, canActivate: [AuthGuard] },
  { path: "search", component: SearchComponent },
  { path: 'perfil/:id', component: PublicProfileComponent },
  { path: 'select-plan', component: SelectPrecioComponent },
  { path: 'update-plan', component: SelectPrecioComponent },
  { path: 'compraOk', component: MercadoPagoOkComponent },
  { path: 'compraFail', component: MercadoPagoFailComponent },
  { path: 'compraPending', component: MercadoPagoPendComponent },
  { path: 'verify/:id', component: VerificationComponent },
  { path: 'feed', component: FeedComponent },
  { path: "**", redirectTo: "/404" },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
