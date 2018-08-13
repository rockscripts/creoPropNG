import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaModalComponent } from './denuncia-modal.component';

describe('DenunciaModalComponent', () => {
  let component: DenunciaModalComponent;
  let fixture: ComponentFixture<DenunciaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
