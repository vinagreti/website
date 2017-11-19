import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ShareService } from './../share/share.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;

  constructor(private  shareService: ShareService) { }

  ngOnInit() {
  }

  shareSomething = () => {
    this.shareService.open();
  }
}
