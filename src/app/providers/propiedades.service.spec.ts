import { TestBed, inject } from '@angular/core/testing';

import { PropiedadesService } from './propiedades.service';

describe('PropiedadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropiedadesService]
    });
  });

  it('should be created', inject([PropiedadesService], (service: PropiedadesService) => {
    expect(service).toBeTruthy();
  }));
});
