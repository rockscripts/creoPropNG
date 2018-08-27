import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImbProfileViewComponent } from './imb-profile-view.component';

describe('ImbProfileViewComponent', () => {
  let component: ImbProfileViewComponent;
  let fixture: ComponentFixture<ImbProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImbProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImbProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
