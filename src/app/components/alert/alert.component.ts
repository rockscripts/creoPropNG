import { Component, OnInit } from '@angular/core';

import { AlertService }      from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  msg:string      = '';
  oculto:boolean  = true;

  constructor(
    private alert:AlertService
  ) { }

  ngOnInit() {
    this.alert.showAlert.subscribe({
      next: (v) => {
        this.show(<string> v);
      }
    });
  }

  dismiss(){  this.oculto = true; }
  show(msg) { this.msg = msg; this.oculto = false; }
}
