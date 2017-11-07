import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalDatabaseService } from './local-database.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LocalDatabaseService
  ]
})
export class LocalDatabaseModule { }
