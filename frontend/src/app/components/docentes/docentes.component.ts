import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { AppService } from '../../app.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, FormsModule, SidebarComponent, MatFormFieldModule, MatInputModule, MatPaginatorModule],
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css'
})
export class DocentesComponent implements OnInit {
  private appService = inject(AppService);
  private dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);

  docentes: any[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'acciones'];

  ngOnInit() {
    this.loadDocentes();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDocentes() {
    this.appService.getDocentes().subscribe((data) => {
      this.docentes = data;
      this.dataSource.data = data;

    });
  }

  openDialog(docente?: any) {
    const dialogRef = this.dialog.open(DocenteDialogComponent, {
      width: '500px',
      data: docente ? { ...docente } : { nombre: '', apellido: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (docente) {
          this.appService.updateDocente(result).subscribe(() => this.loadDocentes());
        } else {
          this.appService.addDocente(result).subscribe(() => this.loadDocentes());
        }
      }
    });
  }

  toggleDocente(docente: any) {
    docente.isActive = !docente.isActive;
    this.appService.updateDocente(docente).subscribe(() => this.loadDocentes());
  }
}

@Component({
  selector: 'app-docente-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>{{ data.id ? 'Editar docente' : 'Agregar docente' }}</h2>
    <div mat-dialog-content>
      <mat-form-field appearance="fill" class="wide-field">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="data.nombre" name="nombre" required />
      </mat-form-field>
      <mat-form-field appearance="fill" class="wide-field">
        <mat-label>Apellido</mat-label>
        <input matInput [(ngModel)]="data.apellido" name="apellido" required />
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button (click)="onSave()" color="primary" [disabled]="!data.nombre || !data.apellido">Guardar</button>
    </div>
  `,
  styles: [
    `.wide-field {
      width: 100%;
      min-width: 300px;
    }`
  ]
})
export class DocenteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DocenteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}
