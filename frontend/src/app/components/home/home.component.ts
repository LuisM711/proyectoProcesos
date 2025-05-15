import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { environment } from '../../app.environment';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  environment = environment;
  images = [
    `${environment.url}/slider/1.jpg`,
    `${environment.url}/slider/2.png`,
    `${environment.url}/slider/3.jpg`,
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
