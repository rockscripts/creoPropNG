import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPagoPendComponent } from './mercado-pago-pend.component';

describe('MercadoPagoPendComponent', () => {
  let component: MercadoPagoPendComponent;
  let fixture: ComponentFixture<MercadoPagoPendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoPagoPendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoPagoPendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
