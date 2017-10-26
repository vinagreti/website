import { Component, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  @ViewChild('sidenav') sidenav;

  constructor(
    private matIconRegistry: MatIconRegistry
  ) {
    matIconRegistry.setDefaultFontSetClass('fa');
  }

  teste() {
    this.sidenav.toggle();
  }
}
