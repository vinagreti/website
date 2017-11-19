import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { UserRoleDirectiveModule } from './../shared/directives/user-role/user-role.module';

@NgModule({
  imports: [
    UserRoleDirectiveModule,
    BlogRoutingModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
