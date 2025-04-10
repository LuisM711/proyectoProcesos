import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule,
    FormsModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { numeroDeCuenta: '', password: '' };
  userData: any = null; // Datos del usuario tras login
  changePasswordForm: FormGroup;
  isFirstLogin = false; // Estado para saber si hay que cambiar la contraseña

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Formulario para cambiar la contraseña
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  login() {
    this.appService.login(this.credentials).subscribe(
      (response) => {
        if (response) {
          this.userData = response; // Guardamos los datos del usuario
          if (this.credentials.numeroDeCuenta === this.credentials.password) {
            // Primer inicio de sesión, requiere cambio de contraseña
            this.isFirstLogin = true;
            this.snackBar.open('Debes cambiar tu contraseña antes de continuar.', 'Close', { duration: 3000 });
          } else {
            // Inicio de sesión normal
            this.snackBar.open('Inicio de sesión exitoso', 'Close', { duration: 3000 });
            window.location.href = '/';
          }
        } else {
          // this.snackBar.open('Error al iniciar sesión', 'Close', { duration: 3000 });
        }
      },
      () => {
        // this.snackBar.open('Error al iniciar sesión', 'Close', { duration: 3000 });
      }
    );
  }

  changePassword() {
    if (this.changePasswordForm.invalid) return;
    
    const { newPassword, confirmPassword } = this.changePasswordForm.value;
    if (newPassword !== confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden', 'Close', { duration: 3000 });
      return;
    }

    const updateData = {
      id: this.userData.id,
      password: newPassword
    };

    this.appService.changePassword(updateData).subscribe(
      (response) => {
        if (response) {
          this.snackBar.open('Contraseña actualizada', 'Close', { duration: 3000 });
          window.location.href = '/';
        } else {
          this.snackBar.open('Error al actualizar la contraseña', 'Close', { duration: 3000 });
        }
      }
    );
  }
}
