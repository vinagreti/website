import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PersonalAboutComponent } from './personal-about.component';

export const appRoutes: Routes = [
  { path: '',  component: PersonalAboutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class PersonalAboutRoutingModule { }
