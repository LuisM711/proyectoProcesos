import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private appService: AppService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  credentials = { numeroDeCuenta: '', password: '' };




  login() {

    this.appService.login(this.credentials).subscribe(
      (response) => {
        console.log(response.status);
        if (response) {
          this.snackBar.open('Inicio de sesión exitoso', 'Close', { duration: 3000 });
          // this.router.navigate(['/']);
          window.location.href = '/';
        } else {
          this.snackBar.open('Error al iniciar sesión', 'Close', { duration: 3000 });
        }
      },
      (error) => {
        this.snackBar.open('Error al iniciar sesión', 'Close', { duration: 3000 });
      }
    );
  }

}
