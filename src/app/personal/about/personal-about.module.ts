import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { PersonalAboutComponent } from './personal-about.component';
import { PersonalAboutRoutingModule } from './personal-about-routing.module';

@NgModule({
  imports: [
    PersonalAboutRoutingModule,
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [
    PersonalAboutComponent
  ]
})
export class PersonalAboutModule { }
