import { Component, OnInit, Input } from '@angular/core';

import { UserService }             from './../../providers/user.service';
import { ProfileService }          from './../../providers/profile.service';
import { UserProfileModalService } from './../../components/user-profile-modal/user-profile-modal.service';
import { Perfil }                  from './../../models/perfil';
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
    private pModal:  UserProfileModalService,
    private profile: ProfileService
  ) { }

  ngOnInit() {
    if (this.editable){
      this.perfil = this.user.getProfile();
    } else {
      this.perfil = this.profile.actualProfile();
    }
  }

  edit(){
    this.pModal.show();
  }

}
