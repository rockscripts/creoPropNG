export class Inmobiliaria {

  public id: number = -1;
  public nombre: string = '';
  public img: string = '';
  public direccion: string = '';
  public logo: string = '';

  constructor(data?: Inmobiliaria) {
    if (data) {
      Object.assign(this, this.toNumber(data));
      delete this.img;

      return this;
    }
  }

  private toNumber(data: any): any {
    data = { ...data };
    Object.keys(data).forEach(key => {
      if (/^[0-9]+$/g.test(data[key])) {
        data[key] = +data[key];
      }
    });

    return data;
  }

}
