import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { EditGrupoDialogComponent } from './edit-grupo-dialog.component';
// import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    SidebarComponent,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent {
  grupos: any[] = [];
  horas: any[] = [];
  materias: any[] = [];
  docentes: any[] = [];
  modulos: any[] = [];
  grupoSeleccionado: number | null = null;

  allGrupos: any[] = [];
  nuevoGrado: number | null = null;
  nuevoGrupoNumero: number | null = null;

  constructor(private appService: AppService, private dialog: MatDialog) {
    this.cargarDatosIniciales();
    this.cargarGrupos();
  }

  cargarDatosIniciales(): void {
    this.appService.getGruposActivos().subscribe((grupos) => (this.grupos = grupos));
    this.appService.getHoras().subscribe((horas) => (this.horas = horas));
    this.appService.getMateriasActivas().subscribe((materias) => (this.materias = materias));
    this.appService.getDocentesActivos().subscribe((docentes) => (this.docentes = docentes));
  }

  cargarGrupos(): void {
    this.appService.getGrupos().subscribe((grupos) => {
      this.allGrupos = grupos;
    });
  }

  onGrupoChange(grupoId: number): void {
    this.grupoSeleccionado = grupoId;
    this.appService.getModulosByGroup(grupoId).subscribe((modulos) => {
      this.modulos = modulos;
    });
  }
  onHoraChange(modulo: any, horaId: number): void {
    modulo.horaId = horaId;
    this.actualizarModulo(modulo);
  }
  onMateriaChange(modulo: any, materiaId: number): void {
    modulo.materiaId = materiaId;
    this.actualizarModulo(modulo);
  }
  onDocenteChange(modulo: any, docenteId: number): void {
    modulo.docenteId = docenteId;
    this.actualizarModulo(modulo);
  }
  actualizarModulo(modulo: any): void {
    if (modulo.id) {
      this.appService.updateModulo(modulo).subscribe(() => {
        console.log('Módulo actualizado:', modulo);
      });
    }
  }
  agregarModulo(): void {
    const nuevoModulo = {
      id: null,
      horaId: null,
      grupoId: this.grupoSeleccionado,
      materiaId: null,
      docenteId: null,
      hora: { id: null, horaInicio: 'Por definir', horaFin: 'Por definir' },
      materia: { id: null, nombre: 'Por definir' },
      docente: { id: null, nombre: 'Por definir', apellido: 'Por definir' },
    };
    this.modulos = [...this.modulos, nuevoModulo];
  }
  eliminarModulo(index: number): void {
    const modulo = this.modulos[index];
    if (modulo.id) {
      this.appService.deleteModulo(modulo.id).subscribe(() => {
        this.modulos.splice(index, 1);
      });
    } else {
      this.modulos.splice(index, 1);
    }
  }
  guardarCambios(): void {
    const modulosNuevos = this.modulos.filter((m) => !m.id);
    modulosNuevos.forEach((modulo) => {
      this.appService.addModulo(modulo).subscribe((moduloGuardado) => {
        modulo.id = moduloGuardado.id;
      });
    });
    console.log('Cambios guardados:', this.modulos);
  }
  todosLosCamposLlenos(): boolean {
    return this.modulos.every(
      (modulo) =>
        modulo.horaId !== null && modulo.materiaId !== null && modulo.docenteId !== null
    );
  }

  agregarGrupo(): void {
    const nuevoGrupo = {
      grado: this.nuevoGrado,
      grupo: this.nuevoGrupoNumero,
      isActive: true
    };
    this.appService.addGrupo(nuevoGrupo).subscribe((grupoGuardado) => {
      this.cargarDatosIniciales();
      this.cargarGrupos();
    });
  }
  editarGrupo(grupo: any): void {
    const dialogRef = this.dialog.open(EditGrupoDialogComponent, {
      width: '300px',
      data: { ...grupo }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appService.updateGrupo(result).subscribe(() => {
          this.cargarDatosIniciales();
          this.cargarGrupos();
          // const index = this.allGrupos.findIndex(g => g.id === result.id);
          // if (index > -1) { this.allGrupos[index] = result; }
        });
      }
    });
  }
  deshabilitarGrupo(grupo: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Seguro deseas deshabilitar este grupo?' }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        grupo.isActive = false;
        this.appService.updateGrupo(grupo).subscribe(() => {

          console.log('Grupo deshabilitado:', grupo);
          this.cargarDatosIniciales();
          this.cargarGrupos();
        });
      }
    });
  }
  habilitarGrupo(grupo: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: '¿Seguro deseas habilitar este grupo?' }
    });
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        grupo.isActive = true;
        this.appService.updateGrupo(grupo).subscribe(() => {
          console.log('Grupo habilitado:', grupo);
          this.cargarDatosIniciales();
          this.cargarGrupos();
        });
      }
    });
  }
}




import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, FormsModule],
  standalone: true,
  template: `
        <h1 mat-dialog-title>Confirmar</h1>
        <div mat-dialog-content>
            <p>{{ data.message }}</p>
        </div>
        <div mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()">Cancelar</button>
            <button mat-raised-button color="warn" (click)="onConfirm()">Confirmar</button>
        </div>
    `
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'app-edit-grupo-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, FormsModule],
  template: `
        <h1 mat-dialog-title>Editar hrupo</h1>
        <div mat-dialog-content>
            <mat-form-field appearance="fill">
                <mat-label>Grado</mat-label>
                <input matInput [(ngModel)]="data.grado" type="number">
            </mat-form-field>
            <mat-form-field appearance="fill">
                <mat-label>Número de grupo</mat-label>
                <input matInput [(ngModel)]="data.grupo" type="number">
            </mat-form-field>
        </div>
        <div mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()">Cancelar</button>
            <button mat-raised-button color="primary" (click)="onSave()">Guardar</button>
        </div>
    `
})
export class EditGrupoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditGrupoDialogComponent>
  ) { }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}