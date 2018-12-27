import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVisitasComponent } from './user-visitas.component';

describe('UserVisitasComponent', () => {
  let component: UserVisitasComponent;
  let fixture: ComponentFixture<UserVisitasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVisitasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
