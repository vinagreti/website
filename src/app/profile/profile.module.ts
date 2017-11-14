import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButtonModule, MatIconModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
