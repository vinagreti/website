import { TestBed, inject } from '@angular/core/testing';

import { SidenavMenuService } from './sidenav-menu.service';

describe('SidenavMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavMenuService]
    });
  });

  it('should be created', inject([SidenavMenuService], (service: SidenavMenuService) => {
    expect(service).toBeTruthy();
  }));
});
