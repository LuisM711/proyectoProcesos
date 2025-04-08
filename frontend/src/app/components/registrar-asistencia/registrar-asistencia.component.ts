import { Component, ViewChild, AfterViewInit } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';

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
    MatCardModule,
    MatPaginatorModule,
    MatPaginator

  ],
  templateUrl: './registrar-asistencia.component.html',
  styleUrls: ['./registrar-asistencia.component.css']
})
export class RegistrarAsistenciaComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);

  constructor(private appService: AppService) {


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  grupos: any = [];
  modulos: any = [];
  horas: any = [];
  selectedGrupo: any = null;
  selectedDate: Date = new Date();
  selectedHora: any = null;
  maxDate: Date = new Date();
  isChecador: boolean = false;

  displayedColumns: string[] = ['aula', 'grupo', 'carrera', 'materia', 'hora', 'docente', 'acciones'];

  ngOnInit() {
    this.comprobarChecador();
    this.appService.getHoras().subscribe((res: any) => {
      this.horas = res;
      const now = new Date();
      // console.log(now.getHours());
      // console.log(now.getMinutes());

      now.setMinutes(0);
      now.setSeconds(0);

      //search for the hour in the array of hours

      // console.log("foreach");
      this.horas.forEach((hora: any) => {

        
        const horaInicioDate = new Date('1970-01-01T' + hora.horaInicio);
        // console.log(horaInicioDate);
        if (horaInicioDate.getHours() === now.getHours()) {
          this.selectedHora = hora.id;

          // console.log(hora.id);
        }
      });

    });



    // console.log(this.horas[0].horaInicio);
    // console.log(this.isChecador);



    this.appService.getGruposPermitidos().subscribe((res: any) => {
      this.grupos = res;
      if (this.grupos.length > 0) {
        this.selectedGrupo = this.grupos[0].id;
        if (!this.isChecador)
          this.loadModulosWithRegistros();
        else this.appService.getModulosByHoraAndFecha(this.selectedHora, this.getFechaLocal(this.selectedDate)).subscribe((res: any) => {
          this.modulos = res;
          this.dataSource.data = res;

          console.log(res);
        }
        );
      }
    });


  }

  loadModulosWithRegistros() {
    if (this.selectedGrupo) {
      const fecha = this.getFechaLocal(this.selectedDate);
      this.appService.getModulosWithUserRegistros(this.selectedGrupo, fecha).subscribe((res: any) => {
        this.modulos = res;
        this.dataSource.data = res;
      });
    }
  }


  onGrupoChange() {
    this.loadModulosWithRegistros();
  }

  onDateChange() {
    if (!this.isChecador)
      this.loadModulosWithRegistros();
    else this.appService.getModulosByHoraAndFecha(this.selectedHora, this.getFechaLocal(this.selectedDate)).subscribe((res: any) => {
      this.modulos = res;
      this.dataSource.data = res;

      // console.log(res);
    });

  }
  onHoraChange() {
    this.appService.getModulosByHoraAndFecha(this.selectedHora, this.getFechaLocal(this.selectedDate)).subscribe((res: any) => {
      this.modulos = res;
      this.dataSource.data = res; // Asigna los datos al dataSource
    });
  }

  toggleAsistencia(modulo: any) {
    const registro = modulo.registro;

    // Obtener fecha local en formato YYYY-MM-DD sin conversión a UTC
    const fecha = this.getFechaLocal(this.selectedDate);

    
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

  // Función auxiliar para formatear fecha local como YYYY-MM-DD
  getFechaLocal(date: Date): string {
    const anio = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
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
    });
  }

  getHoras = () => {

  }
}