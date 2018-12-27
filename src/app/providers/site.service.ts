//este provider tiene como finalidad alñmacenar información de uso general en el sitio
// Tal vez en una posibble reestructuración vuele, o tal vez no jaj
import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  public vista = new Subject();

  constructor() { }
}
