import { Component, OnInit, Input } from '@angular/core';

import { UserService } from './../../providers/user.service';
import { Perfil }      from './../../models/perfil';
@Component({
  selector: 'app-perfil-view',
  templateUrl: './perfil-view.component.html',
  styleUrls: ['./perfil-view.component.css']
})
export class PerfilViewComponent implements OnInit {
  @Input() editable:string = '';

  perfil = new Perfil();

  constructor(
    private user: UserService
  ) { }

  ngOnInit() {
    if (this.editable){
    }
  }

  editImg(){
    
  }

}
