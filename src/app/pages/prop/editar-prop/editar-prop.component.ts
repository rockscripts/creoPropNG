import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';

import { Propiedad }          from '../../../models/propiedad';
import { PropiedadesService } from '../../../providers/propiedades.service';

@Component({
  selector: 'app-editar-prop',
  templateUrl: './editar-prop.component.html'
})
export class EditarPropComponent implements OnInit {

  model:Propiedad = new Propiedad();
  id:number       = -1;

  constructor(
  	private propiedades:    PropiedadesService,
  	private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  	this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  	this.propiedades.getPropiedad(this.id);
    this.propiedades.propiedadLoaded.subscribe({  
      next: (m) => { this.model = m; } 
    });
  }

  ngOnDestroy(){
  }

}
