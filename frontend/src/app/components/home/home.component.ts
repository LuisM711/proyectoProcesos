import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  images = [
    'http://localhost:4200/slider/1.jpg',
    'http://localhost:4200/slider/2.png',
    'http://localhost:4200/slider/3.jpg',
  ];
  currentIndex = 0;
  autoSlide = true;
  intervalId: any;

  constructor() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      if (this.autoSlide) {
        this.nextImage();
      }
    }, 3000);
  }

  stopAutoSlide() {
    this.autoSlide = false;
  }

  resumeAutoSlide() {
    this.autoSlide = true;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
