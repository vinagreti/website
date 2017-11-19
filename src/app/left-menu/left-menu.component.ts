import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

}
