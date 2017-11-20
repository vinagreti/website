import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { TextareaResizeModule } from './../shared/directives/textarea-resize/textarea-resize.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ProfileRoutingModule,
    TextareaResizeModule,
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
