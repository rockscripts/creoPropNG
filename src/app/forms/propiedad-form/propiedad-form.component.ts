import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router }            from '@angular/router';
import { }                   from '@types/googlemaps';
import { MapsAPILoader }     from '@agm/core';
import { FormControl }       from '@angular/forms'; //[Modificar] despues se usará este componente para todos los formularios?

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

  mapZoom    = 4;
  @ViewChild("search") public searchElementRef: ElementRef;
  searchControl: FormControl;
  
  equipamiento:any;
  servicios:any;
  ambientes:any;
  carac_gral:any;

  zona:any     = [[],[],[],[],[]];
  denomina:any = ['','Provincia','','',''];

  pais_id:number      = -1;

  constructor(
    private zonas:         ZonasService,
    private router:        Router,
    private prop:          PropiedadesService,
    private user:          UserService,
    private alert:         AlertService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone:        NgZone
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
    if(this.prop.modelVacio){
      this.model = new Propiedad();
    } else {
      this.model = this.prop.getModel();
    }

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

    this.initMaps();
  }

  private initMaps(){
    this.setCurrentPosition();
    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.model.latitud  = place.geometry.location.lat();
          this.model.longitud = place.geometry.location.lng();
          this.mapZoom        = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.model.latitud  = position.coords.latitude;
        this.model.longitud = position.coords.longitude;
        this.mapZoom        = 12;
      });
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
