import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  public eBadLogin:string = 'Usuario o contraseña incorrecta';

  constructor() { }
}
