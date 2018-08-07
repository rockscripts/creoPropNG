import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormBComponent } from './signup-form-b.component';

describe('SignupFormBComponent', () => {
  let component: SignupFormBComponent;
  let fixture: ComponentFixture<SignupFormBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupFormBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
