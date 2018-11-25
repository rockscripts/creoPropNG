import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';

import { UserProfileModalService } from './user-profile-modal.service';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html'
})
export class UserProfileModalComponent implements OnInit {
  @ViewChild('userPModal') userPModal:ElementRef;

  showM = false;

  constructor(
    private uModal: UserProfileModalService
  ) { }

  ngOnInit() {
    this.uModal.showModal.subscribe({
      next: () => {
        this.show();
      }
    });

    this.uModal.hideModal.subscribe({
      next: () => {
        this.hide();
      }
    });
  }

  show(){
    this.showM   = true;
    console.log(this.showM);
  }

  hide(){
    this.showM   = false;
  }

}
