import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenSourceComponent } from './open-source.component';
import { OpenSourceRoutingModule } from './open-source-routing.module';

@NgModule({
  imports: [
    OpenSourceRoutingModule,
    CommonModule
  ],
  declarations: [OpenSourceComponent]
})
export class OpenSourceModule { }
