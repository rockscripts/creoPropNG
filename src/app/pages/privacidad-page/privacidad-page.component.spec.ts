import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadPageComponent } from './privacidad-page.component';

describe('PrivacidadPageComponent', () => {
  let component: PrivacidadPageComponent;
  let fixture: ComponentFixture<PrivacidadPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacidadPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
