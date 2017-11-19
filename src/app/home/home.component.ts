import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bgImage: string;

  constructor() { }

  ngOnInit() {
    this.bgImage = this.getBgImage();
  }

  getBgImage() {
    const ramdomImageIndex = Math.round(Math.random() * (bgImages.length - 1));
    return bgImages[ramdomImageIndex];
  }
}

const bgImages = [
  '/assets/img/bg1.jpg',
  '/assets/img/bg2.jpg',
  '/assets/img/bg3.jpg',
  '/assets/img/bg4.jpg',
];
