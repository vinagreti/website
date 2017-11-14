import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuardService } from './../shared/services/guard/logged-guard.service';
import { ProfileComponent } from './profile.component';

const _dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [LoggedGuardService],
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(_dashboardRoutes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
