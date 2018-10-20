import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPagoFailComponent } from './mercado-pago-fail.component';

describe('MercadoPagoFailComponent', () => {
  let component: MercadoPagoFailComponent;
  let fixture: ComponentFixture<MercadoPagoFailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPagoFailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPagoFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
