import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Propiedad }           from '../../models/propiedad';
import { ZonasService }        from '../../providers/zonas.service';
import { PropiedadesService }  from '../../providers/propiedades.service';
import { UserService }         from '../../providers/user.service';
import { AlertService }        from '../../components/alert/alert.service';

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

  zona:any     = [[],[],[],[],[]];
  denomina:any = ['','Provincia','','',''];

  pais_id:number      = -1;

  tipo_prop:any = [
    {"id":0,"nombre":"Casa"},
    {"id":1,"nombre":"Departamento"}
  ];
  tipo_op:any = [
    {"id":0,"nombre":"Venta"},
    {"id":1,"nombre":"Alquiler"},
    {"id":2,"nombre":"Alquiler temporal"}
  ];
  disposicion:any = [
    {"id":0,"nombre":"Frente"},
    {"id":1,"nombre":"Contrafrente"},
    {"id":2,"nombre":"Interno"},
    {"id":3,"nombre":"Lateral"}
  ];
  moneda:any = [
    {"id":2,"nombre":"U$S"},
    {"id":1,"nombre":"AR$"}
  ]

  constructor(
    private zonas:  ZonasService,
    private router: Router,
    private prop:   PropiedadesService,
    private user:   UserService,
    private alert:  AlertService,
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
    this.zonas.setBusqueda({'nivel':1,'root':-1 });
    this.zonas.getZonas().subscribe((r)  => {
      this.zona[0] = r['data'];
      this.pais_id = this.zona[0][0].id;
      this.model.zona[0] = this.pais_id;

      this.changeZonaSelect(0);
    });

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

  changeZonaSelect(l){
    if(l>this.zonas.MAX_LEVELS-1){
      return false;
    }

    this.zonas.setBusqueda({'nivel':l+2,'root':this.model.zona[l] });
    let z = this.model.zona[l];

    this.zonas.getZonas().subscribe((r)  => {
      this.zona[l+1] = r['data'];

      if (this.zona[l+1].length > 0){
        this.model.zona[l]   = z;
        this.model.zona[l+1] = this.zona[l+1][0].id;
        this.changeZonaSelect(l+1);
      }
    });
  }

  onSubmit() { this.submitted = true; }

  newProp(){
    this.prop.setModel(this.model);
    if (this.user.permiso('new-prop')){
      if (!this.model.formValid()){
        this.alert.show(this.model.errors);
        return false;
      }

      this.prop.create()
      .subscribe((r) => {
          this.prop.clearModel(); //[modificar] //esto se tendria que hacer automáticamente cada vez que se crea una nueva propiedad
          this.router.navigate(['/new-prop-ok']);
      });
    }
  }

}
