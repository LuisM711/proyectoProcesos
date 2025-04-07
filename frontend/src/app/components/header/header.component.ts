import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAdmin = false;
  isDocente = false;
  loggedIn = false;

  constructor(private appService: AppService) {
    this.appService.getInfo().subscribe(
      (response) => {
        if(!response.logged)
          return;

        // console.log(response);
        if (response.rolId === 1) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
        this.loggedIn = true;
        this.isDocente = response.rolId === 4;
      },
      (error) => {
        // console.log(error);
      }
    );
  }


  logout() {
    this.appService.logout().subscribe(
      (response) => {
        // console.log(response);
        if (response) {
          this.isAdmin = false;
          this.isDocente = false;
          this.loggedIn = false;
          window.location.reload();
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }

}