import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Propiedad }           from '../../models/propiedad';
import { ZonasService }        from '../../providers/zonas.service';
import { PropiedadesService }  from '../../providers/propiedades.service';
import { UserService }         from '../../providers/user.service';

@Component({
  selector: 'app-propiedad-form',
  templateUrl: './propiedad-form.component.html',
  styleUrls: ['./propiedad-form.component.css']
})
export class PropiedadFormComponent implements OnInit {

  model:Propiedad;
  submitted  = false;
  dataTarget = '';

  equipamiento:any;
  servicios:any;
  ambientes:any;
  carac_gral:any;

  zona:any = [[],[],[],[],[]];

  tipo_prop:any = [
    {"id":"0","nombre":"Casa"},
    {"id":"1","nombre":"Departamento"}
  ];
  tipo_op:any = [
    {"id":"0","nombre":"Venta"},
    {"id":"1","nombre":"Alquiler"},
    {"id":"2","nombre":"Alquiler temporal"}
  ];
  disposicion:any = [
    {"id":"0","nombre":"Frente"},
    {"id":"1","nombre":"Contrafrente"},
    {"id":"2","nombre":"Interno"},
    {"id":"3","nombre":"Lateral"}
  ];
  moneda:any = [
    {"id":"2","nombre":"U$S Dólares"},
    {"id":"1","nombre":"AR$ Pesos"}
  ]

  constructor(
    private zonas:  ZonasService,
    private router: Router,
    private prop:   PropiedadesService,
    private user:   UserService
  ) {}

  onFileChange(event) { //[modificar] //se podrá generalizar?
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.imgs.push({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }


  ngOnInit() {
    this.zona.setBusqueda({'nivel':2,'root':1 });
    this.zonas.getZonas().subscribe((r)  => {  this.zonas[0] = r['data'];  });

    this.prop.getEquipamiento().subscribe((r) => { this.equipamiento = r['data']; });
    this.prop.getServicios().subscribe((r) => { this.servicios = r['data']; });
    this.prop.getAmbientes().subscribe((r) => { this.ambientes = r['data']; });
    this.prop.getCaraceristicas().subscribe((r) => { this.carac_gral = r['data']; });

    if(this.prop.modelVacio){
      this.model = new Propiedad();
    } else {
      this.model = this.prop.getModel();
    }
  }

  onSubmit() { this.submitted = true; }

  newProp(){
    this.prop.setModel(this.model);
    if (this.user.permiso('new-prop')){
      this.prop.create()
      .subscribe((r) => {
          this.prop.clearModel(); //[modificar] //esto se tendria que hacer automáticamente cada vez que se crea una nueva propiedad
          this.router.navigate(['/new-prop-ok']);
      });
    }
  }

}
