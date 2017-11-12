import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthCenterComponent } from './auth-center.component';

const _authRoutes: Routes = [

  { path: '', component: AuthCenterComponent,
    children: [
      { path: '',     component: AuthComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(_authRoutes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
