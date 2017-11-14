import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguredProfileGuardService } from './../shared/services/guard/configured-profile-guard.service';
import { DashboardComponent } from './dashboard.component';

const _dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [ConfiguredProfileGuardService],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(_dashboardRoutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
