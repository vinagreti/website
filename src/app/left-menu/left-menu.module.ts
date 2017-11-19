import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeftMenuComponent } from './left-menu.component';
import { UserRoleDirectiveModule } from './../shared/directives/user-role/user-role.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    UserRoleDirectiveModule,
  ],
  declarations: [LeftMenuComponent],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
