import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DenunciaModalService } from './denuncia-modal.service';

@Component({
  selector: 'app-denuncia-modal',
  templateUrl: './denuncia-modal.component.html'
})
export class DenunciaModalComponent implements OnInit {
  @ViewChild('denunciaModal') denunciaModal:ElementRef;

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

    this.dModal.hideModal.subscribe({
      next: () => {
        this.hide();
      }
    });
  }

  show(){
    this.showM   = true;
    this.cssProp = 'display: block;';
  }

  hide(){
    this.showM   = false;
    this.denunciaModal.nativeElement.click();
    this.cssProp = 'display: none;';
  }
}
