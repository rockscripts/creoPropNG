import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPropComponent } from './nueva-prop.component';

describe('NuevaPropComponent', () => {
  let component: NuevaPropComponent;
  let fixture: ComponentFixture<NuevaPropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
