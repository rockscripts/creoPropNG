import { Component, OnInit } from '@angular/core';

import { UserProfileModalService } from './../../components/user-profile-modal/user-profile-modal.service';
import { UserService }             from './../../providers/user.service';
import { ProfileService }          from './../../providers/profile.service';
import { Perfil }                  from './../../models/perfil';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html'
})
export class UserProfileFormComponent implements OnInit {

  model = new Perfil();

  constructor(
    private modal:  UserProfileModalService,
    private perfil: ProfileService,
    private user:   UserService
  ) { }

  ngOnInit() {
    this.model = this.user.getProfile();

    this.perfil.profileGet.subscribe({
      next: (v) => {
        this.model = this.perfil.actualProfile();
      }
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.img_data.push({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  guardar(){
    this.perfil.updateProfile(this.model);
    this.perfil.profileUpdated.subscribe({
      next: (v) => {
        this.modal.hide();
      }
    });
  }

}
