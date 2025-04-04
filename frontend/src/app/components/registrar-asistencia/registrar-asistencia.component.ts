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
import { CdkDialogContainer } from '@angular/cdk/dialog';

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

  constructor(private appService: AppService) {


  }

  grupos: any = [];
  modulos: any = [];
  horas: any = [];
  selectedGrupo: any = null;
  selectedDate: Date = new Date();
  selectedHora: any = null;
  maxDate: Date = new Date();
  isChecador: boolean = false;

  displayedColumns: string[] = ['aula', 'carrera', 'materia', 'hora', 'docente', 'acciones'];

  ngOnInit() {
    this.comprobarChecador();
    this.appService.getHoras().subscribe((res: any) => {
      this.horas = res;
      const now = new Date();
      // console.log(now.getHours());
      // console.log(now.getMinutes());
  
      now.setMinutes(0);
      now.setSeconds(0);
      console.log(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      //search for the hour in the array of hours
  
      // console.log("foreach");
      this.horas.forEach((hora: any) => {
        console.log(hora.horaInicio);
  
        const horaInicioDate = new Date('1970-01-01T' + hora.horaInicio);
        console.log(horaInicioDate);
        if (horaInicioDate.getHours() === now.getHours()) {
          this.selectedHora = hora.id;
          console.log("Matching hour found");
          console.log(hora.id);
        }
      });
  
    });
    


    // console.log(this.horas[0].horaInicio);
    // console.log(this.isChecador);



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
        // console.log(this.modulos);
      });
    }
  }

  onGrupoChange() {
    this.loadModulosWithRegistros();
  }

  onDateChange() {
    this.loadModulosWithRegistros();
  }
  onHoraChange() {
    // this.loadModulosWithRegistros();
  }

  toggleAsistencia(modulo: any) {
    const registro = modulo.registro;
    const fecha = this.selectedDate.toISOString().split('T')[0];

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


  comprobarChecador = () => {
    this.appService.getInfo().subscribe((res: any) => {
      console.log(res);
      this.isChecador = res.rolId === 3;
    });}

  getHoras = () => {
    
  }
}