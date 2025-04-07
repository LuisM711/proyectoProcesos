import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    SidebarComponent

  ],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private appService: AppService) { }

  grupos: any = [];
  selectedGrupo: any = null;
  // fecha = new Date().toISOString().split('T')[0];
  fecha = new Date();


  
  // dataSource = new MatTableDataSource<any>([]);

  displayedColumns: string[] = ['materia', 'hora', 'docente', 'estado', 'usuario', 'rol'];
  getFechaLocal(date: Date): string {
    const anio = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    console.log(`${anio}-${mes}-${dia}`);
    return `${anio}-${mes}-${dia}`;
  }
  
  ngOnInit() {
    console.log(this.fecha);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'materia':
          return item?.modulo?.materia?.nombre || '';
        case 'hora':
          return item?.modulo?.hora?.horaInicio || '';
        case 'docente':
          return (item?.modulo?.docente?.nombre || '') + (item?.modulo?.docente?.apellido || '');
        case 'estado':
          return item?.impartida ? 'Impartida' : 'No Impartida';
        case 'usuario':
          return (item?.usuario?.nombre || '') + (item?.usuario?.apellido || '');
        case 'rol':
          return item?.usuario?.rol?.nombre || '';
        default:
          return item[property];
      }
    };
  
    this.appService.getGrupos().subscribe((res: any) => {
      this.grupos = res;
      if (this.grupos.length > 0) {
        this.selectedGrupo = this.grupos[0].id;
        this.loadModulosWithRegistros();
      }
    });
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadModulosWithRegistros() {
    if (this.selectedGrupo) {
      this.appService.getRegistrosByGrupo(this.selectedGrupo, this.getFechaLocal(this.fecha)).subscribe((res: any) => {
        this.dataSource.data = res;
        this.sort = this.sort;
        // console.log(res);
        this.dataSource.sort = this.sort;
        // this.dataSource.sort = this.sort;
        // console.log(this.dataSource.sort);

      });
    }
  }

  getEstado(impartida: boolean): string {
    return impartida ? 'Impartida' : 'No Impartida';
  }

  getEstadoColor(impartida: boolean): string {
    return impartida ? 'green' : 'red';
  }
}