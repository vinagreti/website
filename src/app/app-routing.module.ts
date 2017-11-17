import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '',  component: HomeComponent},
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'open-source', loadChildren: './open-source/open-source.module#OpenSourceModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [
  ]
})

export class AppRoutingModule { }
