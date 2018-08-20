import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public showAlert = new Subject();

  show(m){
    this.showAlert.next(m);
  }

  constructor() { }
}
