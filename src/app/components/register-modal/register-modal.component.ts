import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import { RegisterModalService } from './register-modal.service';
import { LoginModalService }    from '../../components/login-modal/login-modal.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  
  showM:boolean  = false;

  private subShow;
  private subHide;

  constructor(
    private modal:      RegisterModalService,
    private modalLogin: LoginModalService
  ) { }

  ngOnInit() {
    this.subShow = this.modal.showModal.subscribe({  next: () => { this.show(); } });
    this.subHide = this.modal.hideModal.subscribe({  next: () => { this.hide(); } });
  }

  ngOnDestroy(){
    this.subShow.unsubscribe();
    this.subHide.unsubscribe();
  }

  show(){ this.showM   = true;  }

  hide(){ this.showM   = false;  }

  goToIngresar(){
    this.modalLogin.show();
    this.hide();
  }
}
