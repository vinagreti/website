import { TestBed, inject } from '@angular/core/testing';

import { LocalFirebaseService } from './local-firebase.service';

describe('LocalFirebaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalFirebaseService]
    });
  });

  it('should be created', inject([LocalFirebaseService], (service: LocalFirebaseService) => {
    expect(service).toBeTruthy();
  }));
});
