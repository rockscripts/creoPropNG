import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { Router }            from '@angular/router';
import { }                   from '@types/googlemaps';
import { MapsAPILoader }     from '@agm/core';

import { PropiedadesService } from './../../../providers/propiedades.service';
import { DenunciaService }    from './../../../providers/denuncia.service';
import { ProfileService }     from './../../../providers/profile.service';
import { Propiedad }          from '../../../models/propiedad';

@Component({
  selector: 'app-prop-detail-page',
  templateUrl: './prop-detail-page.component.html',
  styleUrls: ['./prop-detail-page.component.css']
})
export class PropDetailPageComponent implements OnInit {

  id:number;

  propiedad = new Propiedad();

  constructor(
    private activatedRoute:   ActivatedRoute,
    private propiedadService: PropiedadesService,
    private router:           Router,
    private denuncia:         DenunciaService,
    private perfil:           ProfileService,
    private mapsAPILoader:    MapsAPILoader
  ) {}

  ngOnInit() {

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.propiedadService.getPropiedad(this.id);
    this.propiedadService.propiedadLoaded.subscribe({  
      next: (m) => { this.propiedad = m; } 
    });

    this.mapsAPILoader.load().then(() => { });
  }

  ngOnDestroy(){
    this.propiedadService.propiedadLoaded.unsubscribe();
  }

  denunciar(){
    this.denuncia.setIdProp(this.id);
    this.denuncia.showForm.next();
  }

  goToPerfil(){
    this.perfil.getProfile(this.propiedad[0]['propietario_id']);
    this.perfil.profileGet.subscribe({
      next: () => {
        this.router.navigate(['/perfil/1']);
      }
    });
  }

}
