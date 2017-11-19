import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './left-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  declarations: [LeftMenuComponent],
  exports: [LeftMenuComponent]
})
export class LeftMenuModule { }
