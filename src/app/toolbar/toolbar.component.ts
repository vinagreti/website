import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ShareService } from './../share/share.service';
import { AuthService } from './../auth/shared/auth-service/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;

  constructor(private  shareService: ShareService,
              private auth: AuthService) { }

  ngOnInit() {
  }

  logout = () => {
    this.auth.logout();
  }

  shareSomething = () => {
    this.shareService.open();
  }
}
