import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { PersonalComponent } from './personal.component';

export const appRoutes: Routes = [
  {path: '', component: PersonalComponent, children: [
    { path: '', loadChildren: './about/personal-about.module#PersonalAboutModule' },
    { path: 'blog', loadChildren: './../blog/blog.module#BlogModule' },
    { path: 'contact', loadChildren: './../contact/contact.module#ContactModule' },
    { path: 'portfolio', loadChildren: './../portfolio/portfolio.module#PortfolioModule' },
    { path: 'profile', loadChildren: './../profile/profile.module#ProfileModule' },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class PersonalRoutingModule { }
