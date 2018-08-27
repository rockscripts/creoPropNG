import { Component, OnInit, Input } from '@angular/core';

import { UserService }    from './../../providers/user.service';
import { ProfileService } from './../../providers/profile.service';
import { Perfil }         from './../../models/perfil';
@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.css']
})
export class PerfilViewComponent implements OnInit {
  @Input() editable:string = '';

  perfil = new Perfil();

  constructor(
    private user:    UserService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    this.perfil = this.profile.actualProfile();

    if (this.editable){
    }
  }

  editImg(){

  }

}
