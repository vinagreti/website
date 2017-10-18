import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AboutComponent } from './about.component';

export const appRoutes: Routes = [
  { path: '',  component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class AboutRoutingModule { }
