import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  public eBadLogin:string = 'Usuario o contraseña incorrecta';
  public eBadReq:string   = 'Ocurrio un error, reintente';

  constructor() { }
}
