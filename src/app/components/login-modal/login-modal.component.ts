import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router }            from '@angular/router';

import { UserService }            from '../../providers/user.service';
import { TextsService }           from '../../providers/texts.service';
import { AlertService }           from '../../components/alert/alert.service';
import { User }                   from '../../models/user';

import { LoginModalService }      from './login-modal.service';
import { RegisterModalService }   from '../../components/register-modal/register-modal.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})

export class LoginModalComponent implements OnInit {

  model = new User();

  showM:boolean  = false;

  private subShow;
  private subHide;

  constructor(
    private modal:    LoginModalService,
    private modalReg: RegisterModalService,
    private router:   Router,
    private alert:    AlertService,
    private texts:    TextsService,
    private US :      UserService
  ) { }

  ngOnInit() {
    this.subShow = this.modal.showModal.subscribe({  next: () => { this.show(); } });
    this.subHide = this.modal.hideModal.subscribe({  next: () => { this.hide(); } });
  }

  ngOnDestroy(){
    this.subShow.unsubscribe();
    this.subHide.unsubscribe();
  }

  login(){
    this.US.model = this.model;
    this.US.logIn()
      .subscribe((r) => {
        if (r['errors'] == ''){
          this.US.setLogin(r);
          this.hide();
          this.US.onLogin.next();
          this.US.clearModel();
          this.router.navigate(['/home/1']);
        } else {
          this.alert.show(this.texts.eBadLogin);
        }
    });
  }

  show(){ this.showM = true;  }

  hide(){ this.showM = false;  }

  irRegistro(){
    this.modalReg.show();
    this.modal.hide();
  }
}
