import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    AuthComponent,
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthComponentModule {}
