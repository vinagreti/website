import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ContactComponent } from './contact.component';

export const appRoutes: Routes = [
  { path: '',  component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class ContactRoutingModule { }
