import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BlogComponent } from './blog.component';

export const appRoutes: Routes = [
  { path: '',  component: BlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class BlogRoutingModule { }
