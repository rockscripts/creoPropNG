import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { UserService }            from '../../providers/user.service';
import { TextsService }           from '../../providers/texts.service';
import { AlertService }           from '../../components/alert/alert.service';
import { User }                   from '../../models/user';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})

export class LoginModalComponent implements OnInit {
  @ViewChild('lgCloseBtn') lgCloseBtn:ElementRef;

  model = new User();

  showM:boolean  = false;
  cssProp:string = '';

  constructor(
    private router: Router,
    private alert:  AlertService,
    private texts:  TextsService,
    private US :    UserService
  ) { }

  ngOnInit() {
  }

  login(){
    this.US.model = this.model;
    this.US.logIn()
      .subscribe((r) => {
        if (r['errors'] == ''){
          this.US.setLogin(r);
          this.lgCloseBtn.nativeElement.click();
          this.US.onLogin.next();
          this.US.clearModel();
          this.router.navigate(['/home/1']);
        } else {
          this.alert.show(this.texts.eBadLogin);
        }
    });
  }

  show(){
    this.showM   = true;
    this.cssProp = 'display: block;';
  }

  hide(){
    this.showM   = false;
    this.cssProp = 'display: none;';
  }

  cerrar(){
    this.lgCloseBtn.nativeElement.click();
  }

  irRegistro(){
    this.cerrar();
  }
}
