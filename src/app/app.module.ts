import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShareModule } from './share/share.module';
import { LocalDatabaseModule } from './shared/services/local-database/local-database.module';
import { AuthServiceModule } from './auth/shared/auth-service/auth-service.module';
import { GuardModule } from './shared/services/guard/guard.module';
import { AdminOnlyDirectiveModule } from './shared/directives/admin-only/admin-only.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AdminOnlyDirectiveModule,
    AppRoutingModule,
    AuthServiceModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    GuardModule,
    LocalDatabaseModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    ShareModule,
    HttpModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
  ]
})
export class AppModule {}
