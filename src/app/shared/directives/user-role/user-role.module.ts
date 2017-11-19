import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoleDirective } from './user-role.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserRoleDirective
  ],
  exports: [
    UserRoleDirective
  ],
})
export class UserRoleDirectiveModule { }
