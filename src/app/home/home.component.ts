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
    console.log('ddddddddd', ramdomImageIndex);
    return bgImages[ramdomImageIndex];
  }

}

const bgImages = [
  'https://i.pinimg.com/736x/74/66/34/746634fe2d718c4fc27b435eccfad584--coding-java.jpg',
  'https://i.pinimg.com/originals/47/e5/db/47e5dbb493ecf7ed5ce56a09a5d82e09.jpg',
  'https://i.pinimg.com/originals/0d/47/e0/0d47e03f2e5fc9fb82930b96eaf7e375.jpg',
  'https://i.pinimg.com/originals/f5/d7/2c/f5d72ce72bd0300c3b4daccf4f66266f.jpg',
  'https://i.pinimg.com/originals/99/83/cf/9983cf8edddae80ed2b9599a26111bc7.jpg',
];
