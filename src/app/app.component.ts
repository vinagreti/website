import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry, MatSidenav } from '@angular/material';
import { AuthService } from './auth/shared/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  @ViewChild(MatSidenav) sidenav;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private auth: AuthService
  ) {
    this.configureIconFont();
  }

  private configureIconFont() {
    this.matIconRegistry.setDefaultFontSetClass('fa');
  }

  logout = () => {
    this.auth.logout();
  }
}
