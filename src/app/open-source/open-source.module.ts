import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { OpenSourceComponent } from './open-source.component';
import { OpenSourceRoutingModule } from './open-source-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    OpenSourceRoutingModule,
  ],
  declarations: [OpenSourceComponent]
})
export class OpenSourceModule { }
