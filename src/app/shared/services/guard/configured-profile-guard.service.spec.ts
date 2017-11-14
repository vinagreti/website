import { TestBed, inject } from '@angular/core/testing';

import { ConfiguredProfileGuardService } from './configured-profile-guard.service';

describe('ConfiguredProfileGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguredProfileGuardService]
    });
  });

  it('should be created', inject([ConfiguredProfileGuardService], (service: ConfiguredProfileGuardService) => {
    expect(service).toBeTruthy();
  }));
});
