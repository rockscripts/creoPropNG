import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropDetailPageComponent } from './prop-detail-page.component';

describe('PropDetailPageComponent', () => {
  let component: PropDetailPageComponent;
  let fixture: ComponentFixture<PropDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
