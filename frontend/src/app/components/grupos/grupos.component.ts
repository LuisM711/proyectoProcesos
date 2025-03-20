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
    MatButtonModule
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

  constructor(private appService: AppService) {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales(): void {
    this.appService.getGruposActivos().subscribe((grupos) => (this.grupos = grupos));
    this.appService.getHoras().subscribe((horas) => (this.horas = horas));
    this.appService.getMateriasActivas().subscribe((materias) => (this.materias = materias));
    this.appService.getDocentesActivos().subscribe((docentes) => (this.docentes = docentes));
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
        this.modulos = this.modulos.filter((_, i) => i !== index);
      });
    } else {
      this.modulos = this.modulos.filter((_, i) => i !== index);
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
      (modulo) => modulo.horaId !== null && modulo.materiaId !== null && modulo.docenteId !== null
    );
  }
}
