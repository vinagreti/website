import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { ShareService } from './share/share.service';
import { AuthService } from './auth/shared/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  user;

  @ViewChild('sidenav') sidenav;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private  shareService: ShareService,
    private auth: AuthService
  ) {
    this.configureIconFont();
    this.user = this.auth.user;
  }

  private configureIconFont() {
    this.matIconRegistry.setDefaultFontSetClass('fa');
  }

  shareSomething = () => {
    this.shareService.open();
  }

  logout = () => {
    this.auth.logout();
  }
}
