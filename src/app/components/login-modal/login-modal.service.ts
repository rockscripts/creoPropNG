import { Injectable }      from '@angular/core'; //[Modificar] Este tipo de clases se puede generalizar
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {

  constructor() { }

  public showModal = new BehaviorSubject<boolean>(true);
  public hideModal = new BehaviorSubject<boolean>(true);

  show(){
    this.showModal.next(true);
  }

  hide(){
    this.hideModal.next(true);
  }
}
