import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LocalDatabaseModule } from './shared/services/local-database/local-database.module';
import { AuthServiceModule } from './auth/shared/auth-service/auth-service.module';
import { GuardModule } from './shared/services/guard/guard.module';
import { UserRoleDirectiveModule } from './shared/directives/user-role/user-role.module';

import { LeftMenuModule } from './left-menu/left-menu.module';
import { ToolbarModule } from './toolbar/toolbar.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    UserRoleDirectiveModule,
    AppRoutingModule,
    AuthServiceModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    GuardModule,
    HttpModule,
    LeftMenuModule,
    LocalDatabaseModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule,
    ToolbarModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
  ]
})
export class AppModule {}
