import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrecioComponent } from './select-precio.component';

describe('SelectPrecioComponent', () => {
  let component: SelectPrecioComponent;
  let fixture: ComponentFixture<SelectPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
