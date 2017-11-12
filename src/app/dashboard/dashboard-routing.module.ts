import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from './../shared/services/guard/can-activate-guard.service';
import { DashboardComponent } from './dashboard.component';

const _dashboardRoutes: Routes = [
  {
    path: '',
    canActivate: [CanActivateGuardService],
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(_dashboardRoutes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
