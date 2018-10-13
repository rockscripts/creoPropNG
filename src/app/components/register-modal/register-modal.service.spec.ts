import { TestBed } from '@angular/core/testing';

import { RegisterModalService } from './register-modal.service';

describe('RegisterModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterModalService = TestBed.get(RegisterModalService);
    expect(service).toBeTruthy();
  });
});
