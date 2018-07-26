import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPropOkComponent } from './nueva-prop-ok.component';

describe('NuevaPropOkComponent', () => {
  let component: NuevaPropOkComponent;
  let fixture: ComponentFixture<NuevaPropOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPropOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPropOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
