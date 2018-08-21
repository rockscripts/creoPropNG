import { Component, OnInit } from '@angular/core';

import { DenunciaModalService } from './denuncia-modal.service';

@Component({
  selector: 'app-denuncia-modal',
  templateUrl: './denuncia-modal.component.html',
  styleUrls: ['./denuncia-modal.component.css']
})
export class DenunciaModalComponent implements OnInit {

  showM:boolean = false;
  cssProp:string = '';

  constructor(
    private dModal: DenunciaModalService
  ) { }

  ngOnInit() {
    this.dModal.showModal.subscribe({
      next: () => {
        this.show();
      }
    });
  }

  show(){
    this.showM   = true;
    this.cssProp = 'display: block;';
  }
}
