import { NgModule } from '@angular/core';
import { ConfiguredProfileGuardService } from './configured-profile-guard.service';
import { LoggedGuardService } from './logged-guard.service';

@NgModule({
  providers: [
    ConfiguredProfileGuardService,
    LoggedGuardService,
  ]
})
export class GuardModule {}
