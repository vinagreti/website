import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { LocalDatabaseService } from './local-database.service';
import { LocalFirebaseModule } from './../local-firebase/local-firebase.module';

@NgModule({
  imports: [
    CommonModule,
    LocalFirebaseModule,
    MatSnackBarModule,
  ],
  providers: [
    LocalDatabaseService,
  ]
})
export class LocalDatabaseModule { }
