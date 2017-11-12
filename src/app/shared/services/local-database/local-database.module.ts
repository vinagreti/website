import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDatabaseService } from './local-database.service';
import { LocalFirebaseModule } from './../local-firebase/local-firebase.module';

@NgModule({
  imports: [
    CommonModule,
    LocalFirebaseModule,
  ],
  providers: [
    LocalDatabaseService,
  ]
})
export class LocalDatabaseModule { }
