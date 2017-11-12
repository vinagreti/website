import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AuthCenterComponent } from './auth-center.component';
import { AuthComponentModule } from './auth.component.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    AuthComponentModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    AuthRoutingModule
  ],
  exports: [
    AuthCenterComponent
  ],
  declarations: [
    AuthCenterComponent
  ]
})
export class AuthModule {}
