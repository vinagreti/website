import { TestBed, inject } from '@angular/core/testing';

import { BiintwnService } from './biintwn.service';

describe('BiintwnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiintwnService]
    });
  });

  it('should be created', inject([BiintwnService], (service: BiintwnService) => {
    expect(service).toBeTruthy();
  }));
});
