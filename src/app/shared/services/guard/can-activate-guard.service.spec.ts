import { TestBed, inject } from '@angular/core/testing';

import { CanActivateGuardService } from './can-activate-guard.service';

describe('CanActivateGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateGuardService]
    });
  });

  it('should be created', inject([CanActivateGuardService], (service: CanActivateGuardService) => {
    expect(service).toBeTruthy();
  }));
});
