import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { PropiedadesService } from './../../../providers/propiedades.service';
import { DenunciaService } from './../../../providers/denuncia.service';
import { ProfileService } from './../../../providers/profile.service';
import { Propiedad } from '../../../models/propiedad';
import { ConfigService } from '../../../providers/config.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../../components/alert/alert.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-prop-detail-page',
  templateUrl: './prop-detail-page.component.html',
  styleUrls: ['./prop-detail-page.component.css']
})
export class PropDetailPageComponent implements OnInit {
  id: number;
  propiedad = new Propiedad();
  contact: any = {};


  constructor(
    private activatedRoute: ActivatedRoute,
    private propiedadService: PropiedadesService,
    private router: Router,
    private denuncia: DenunciaService,
    private perfil: ProfileService,
    private mapsAPILoader: MapsAPILoader,
    private config: ConfigService,
    private http: HttpClient,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.contact.message = 'Hola, vi esta propiedad en Creoprop y quiero que me contacten. Gracias.';
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.propiedadService.getPropiedad(this.id);
    this.propiedadService.propiedadLoaded
      .subscribe({
        next: (m) => {
          this.propiedad = m;
        }
      });
    this.mapsAPILoader.load()
      .then(() => { });
  }

  ngOnDestroy() {
    // this.propiedadService.propiedadLoaded.unsubscribe();
  }

  denunciar() {
    this.denuncia.setIdProp(this.id);
    this.denuncia.showForm.next();
  }

  goToPerfil() {
    this.router.navigate(['/perfil', this.propiedad.propietario_id]);
  }

  getImgRoute() {
    if (this.propiedad.user.tipo_user_id == 1)  {
      //return  this.config.getAPIImg() + this.propiedad.inmobiliaria.logo;

    }
    return (+this.propiedad.user.tipo_user_id) === 2 ? this.propiedad.inmobiliaria.logo : this.propiedad.user.profile_img;
  }

  sendContact() {
    let data = {
      name: this.contact.name, email: this.contact.email, body: this.contact.message, phone: this.contact.phone
    };

    this.http.post(this.config.getAPIUrl() + `propiedad/${this.propiedad.id}/contact`, data, { observe: 'response' })
      .subscribe(r => {
        this.alert.showAlert.next({
          t: 's', m: 'Mensaje enviado exitosamente'
        });
      }, error => {
        this.alert.showAlert.next({
          t: 'a', m: 'Ha ocurrido un error, intenta de nuevo'
        });
      });
  }
}
