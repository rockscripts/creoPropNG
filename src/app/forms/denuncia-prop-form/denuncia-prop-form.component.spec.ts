import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaPropFormComponent } from './denuncia-prop-form.component';

describe('DenunciaPropFormComponent', () => {
  let component: DenunciaPropFormComponent;
  let fixture: ComponentFixture<DenunciaPropFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciaPropFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciaPropFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
