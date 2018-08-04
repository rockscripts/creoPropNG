import { TestBed, inject } from '@angular/core/testing';

import { GralInfoService } from './gral-info.service';

describe('GralInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GralInfoService]
    });
  });

  it('should be created', inject([GralInfoService], (service: GralInfoService) => {
    expect(service).toBeTruthy();
  }));
});
