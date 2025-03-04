import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grupos',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatLabel,
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
    this.appService.getGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });
    this.appService.getHoras().subscribe((horas) => {
      this.horas = horas;
    });
    this.appService.getMaterias().subscribe((materias) => {
      this.materias = materias;
    });
    this.appService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }
  todosLosCamposLlenos(): boolean {
    return this.modulos.every(modulo => 
      modulo.horaId !== null && 
      modulo.materiaId !== null && 
      modulo.docenteId !== null
    );
  }
  onHoraChange(modulo: any, horaId: number): void {
    modulo.horaId = horaId;
    this.actualizarModulo(modulo);
  }
  onGrupoChange(grupoId: number): void {
    this.grupoSeleccionado = grupoId;
    this.appService.getModulosByGroup(grupoId).subscribe((modulos) => {
      console.log(modulos);
      this.modulos = modulos;
    });
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
    // this.appService.actualizarModulo(modulo).subscribe(() => {
    //   console.log('Módulo actualizado:', modulo);
    // });
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
    this.modulos = this.modulos.filter((_, i) => i !== index);
  }

  guardarCambios(): void {
   
    console.log(this.modulos);
  }
}