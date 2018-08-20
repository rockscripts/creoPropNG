import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class DenunciaModalService {

  public showModal = new Subject();

  constructor() {}

  show(){
    this.showModal.next();
  }
}
