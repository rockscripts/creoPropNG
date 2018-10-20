import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMensajesComponent } from './user-mensajes.component';

describe('UserMensajesComponent', () => {
  let component: UserMensajesComponent;
  let fixture: ComponentFixture<UserMensajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMensajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
