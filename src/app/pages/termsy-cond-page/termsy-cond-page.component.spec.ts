import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsyCondPageComponent } from './termsy-cond-page.component';

describe('TermsyCondPageComponent', () => {
  let component: TermsyCondPageComponent;
  let fixture: ComponentFixture<TermsyCondPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsyCondPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsyCondPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
