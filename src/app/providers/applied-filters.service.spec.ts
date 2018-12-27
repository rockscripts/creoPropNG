/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppliedFiltersService } from './applied-filters.service';

describe('Service: AppliedFilters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppliedFiltersService]
    });
  });

  it('should ...', inject([AppliedFiltersService], (service: AppliedFiltersService) => {
    expect(service).toBeTruthy();
  }));
});
