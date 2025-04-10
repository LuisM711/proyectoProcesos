import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { AppService } from '../../app.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, FormsModule, SidebarComponent, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent implements OnInit {
  private appService = inject(AppService);
  private dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<any>([]);
  
  materias: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];

  ngOnInit() {
    this.loadMaterias();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadMaterias() {
    this.appService.getMaterias().subscribe((data) => {
      this.materias = data;
      this.dataSource.data = data;
    });
  }

  openDialog(materia?: any) {
    const dialogRef = this.dialog.open(MateriaDialogComponent, {
      width: '500px',
      data: materia ? { ...materia } : { nombre: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (materia) {
          this.appService.updateMateria(result).subscribe(() => this.loadMaterias());
          
        } else {
          this.appService.addMateria(result).subscribe(() => this.loadMaterias());
        }
      }
    });
  }

  toggleMateria(materia: any) {
    materia.isActive = !materia.isActive
    this.appService.updateMateria(materia).subscribe(() => this.loadMaterias());
  

    
  }
}

@Component({
  selector: 'app-materia-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Editar materia' : 'Agregar materia' }}</h2>
    <div mat-dialog-content>
      <mat-form-field appearance="fill" class="wide-field">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="data.nombre" name="nombre" required />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button (click)="onSave()" color="primary" [disabled]="!data.nombre">Guardar</button>
    </div>
  `,
  styles: [
    `.wide-field {
      width: 100%;
      min-width: 300px;
    }`
  ]
})
export class MateriaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MateriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}