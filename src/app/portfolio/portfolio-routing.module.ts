import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PortfolioComponent } from './portfolio.component';

export const appRoutes: Routes = [
  { path: '',  component: PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class PortfolioRoutingModule { }
