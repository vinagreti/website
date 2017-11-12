import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: ':user/about', loadChildren: './about/about.module#AboutModule' },
  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
  { path: ':user/blog', loadChildren: './blog/blog.module#BlogModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: ':user/contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'portfolio', loadChildren: './portfolio/portfolio.module#PortfolioModule' },
  { path: ':user/portfolio', loadChildren: './portfolio/portfolio.module#PortfolioModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class AppRoutingModule { }
