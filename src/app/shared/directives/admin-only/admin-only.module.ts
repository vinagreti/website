import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOnlyDirective } from './admin-only.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdminOnlyDirective
  ],
  exports: [
    AdminOnlyDirective
  ],
})
export class AdminOnlyDirectiveModule { }
