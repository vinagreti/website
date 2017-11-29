import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatIconModule, MatChipsModule, MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenSourceComponent } from './open-source.component';
import { OpenSourceRoutingModule } from './open-source-routing.module';
import { UserRoleDirectiveModule } from './../shared/directives/user-role/user-role.module';
import { OpenSourceCardComponent } from './open-source-card/open-source-card.component';
import { OpenSourceFormComponent } from './open-source-form/open-source-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    UserRoleDirectiveModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    OpenSourceRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [OpenSourceComponent, OpenSourceCardComponent, OpenSourceFormComponent]
})
export class OpenSourceModule { }
