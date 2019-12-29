import { TestBed } from '@angular/core/testing';

import { HealthkitService } from './healthkit.service';

describe('HealthkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthkitService = TestBed.get(HealthkitService);
    expect(service).toBeTruthy();
  });
});
