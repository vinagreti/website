import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { OpenSourceComponent } from './open-source.component';

export const appRoutes: Routes = [
  { path: '',  component: OpenSourceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class OpenSourceRoutingModule { }
