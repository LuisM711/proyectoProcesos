import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-edit-usuario-dialog',
  standalone: true,
  templateUrl: './edit-usuario-dialog.component.html',
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule,
    MatPaginatorModule, MatOptionModule, MatCheckboxModule, ReactiveFormsModule, NgForOf, CommonModule
  ],
  styleUrls: ['./edit-usuario-dialog.component.css']
})
export class EditUsuarioDialogComponent {
  editForm: FormGroup;
  roles: any[] = [];
  grupos: any[] = [];
  isEdit: boolean;
  jefeGpoRolId: number = 2; // ID del rol "JefeGPO"

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    public dialogRef: MatDialogRef<EditUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = !!data.id;

    this.editForm = this.fb.group({
      id: [data.id || null],
      nombre: [data.nombre || '', Validators.required],
      apellido: [data.apellido || '', Validators.required],
      numeroDeCuenta: [data.numeroDeCuenta || '', Validators.required],
      password: [data.numeroDeCuenta || '', Validators.required],
      rolId: [data.rolId || '', Validators.required],
      grupoId: [data.usuarioGrupo?.grupoId || null],
      isActive: [data.isActive || false, Validators.required]
    });

    this.appService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.appService.getGrupos().subscribe(grupos => {
      this.grupos = grupos;
    });

    // Escucha cambios en el select de rol para actualizar la validación de grupoId
    this.editForm.get('rolId')?.valueChanges.subscribe(rolId => {
      const grupoControl = this.editForm.get('grupoId');
      if (rolId === this.jefeGpoRolId) {
        grupoControl?.setValidators([Validators.required]); // Hace obligatorio el grupo
      } else {
        grupoControl?.clearValidators(); // Elimina validadores si no es JefeGPO
        grupoControl?.setValue(null); // Limpia el campo
      }
      grupoControl?.updateValueAndValidity(); // Refresca la validación
    });
  }

  isJefeGpoSelected(): boolean {
    return this.editForm.get('rolId')?.value === this.jefeGpoRolId;
  }

  isSaveDisabled(): boolean {
    return this.editForm.invalid;
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      if (this.isEdit) {
        this.appService.updateUsuario(this.editForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.appService.createUsuario(this.editForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  deleteUser(): void {
    if (this.isEdit) {
      this.appService.deleteUsuario(this.data.id).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
