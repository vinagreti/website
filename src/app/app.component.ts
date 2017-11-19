import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry, MatSidenav } from '@angular/material';

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
  ) {
    this.configureIconFont();
  }

  private configureIconFont() {
    this.matIconRegistry.setDefaultFontSetClass('fa');
  }

}
