import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalFirebaseService } from './local-firebase.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    LocalFirebaseService
  ]
})
export class LocalFirebaseModule { }
