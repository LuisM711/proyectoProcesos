import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.css']
})
export class RegistrarAsistenciaComponent {

  constructor(private appService: AppService) { }

  grupos: any = [];
  modulos: any = [];
  selectedGrupo: any = null;
  selectedDate: Date = new Date();
  maxDate: Date = new Date();

  displayedColumns: string[] = ['materia', 'hora', 'docente', 'acciones'];

  ngOnInit() {
    // this.appService.getGruposPermitidos().subscribe((res: any) => {
    //   console.log("Grupos permitidos");
    //   console.log(res);
    //   // this.grupos = res;
    //   // if (this.grupos.length > 0) {
    //   //   this.selectedGrupo = this.grupos[0].id;
    //   //   this.loadModulosWithRegistros();
    //   // }
    // });

    this.appService.getGruposPermitidos().subscribe((res: any) => {
      this.grupos = res;
      if (this.grupos.length > 0) {
        this.selectedGrupo = this.grupos[0].id;
        this.loadModulosWithRegistros();
      }
    });
  }

  loadModulosWithRegistros() {
    if (this.selectedGrupo) {
      const fecha = this.selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      this.appService.getModulosWithUserRegistros(this.selectedGrupo, fecha).subscribe((res: any) => {
        this.modulos = res;
      });
    }
  }

  onGrupoChange() {
    this.loadModulosWithRegistros();
  }

  onDateChange() {
    this.loadModulosWithRegistros();
  }

  toggleAsistencia(modulo: any) {
    const registro = modulo.registro;
    const fecha = this.selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    if (registro) {
      registro.impartida = !registro.impartida;
      this.appService.updateRegistro(registro).subscribe(() => {
        console.log('Registro actualizado');
      });
    } else {
      const nuevoRegistro = {
        moduloId: modulo.id,
        fecha: fecha,
        impartida: true,
        observaciones: ''
      };
      this.appService.addRegistro(nuevoRegistro).subscribe((res: any) => {
        modulo.registro = res;
        console.log('Registro creado');
      });
    }
  }

  getRowColor(modulo: any) {
    const registro = modulo.registro;
    if (!registro) {
      return 'inherit';
    }
    return registro.impartida ? 'lightgreen' : 'lightcoral';
  }
}