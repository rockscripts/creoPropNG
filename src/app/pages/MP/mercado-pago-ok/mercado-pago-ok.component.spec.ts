import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPagoOkComponent } from './mercado-pago-ok.component';

describe('MercadoPagoOkComponent', () => {
  let component: MercadoPagoOkComponent;
  let fixture: ComponentFixture<MercadoPagoOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPagoOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPagoOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
