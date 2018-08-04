import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropResultComponent } from './prop-result.component';

describe('PropResultComponent', () => {
  let component: PropResultComponent;
  let fixture: ComponentFixture<PropResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
