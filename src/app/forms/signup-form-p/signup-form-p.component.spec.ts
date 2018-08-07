import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormPComponent } from './signup-form-p.component';

describe('SignupFormPComponent', () => {
  let component: SignupFormPComponent;
  let fixture: ComponentFixture<SignupFormPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
