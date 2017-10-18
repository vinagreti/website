import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    AboutRoutingModule,
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [
    AboutComponent
  ]
})
export class AboutModule { }
