import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { EditUsuarioDialogComponent } from '../edit-usuario-dialog/edit-usuario-dialog.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  imports: [
    MatPaginator,
    SidebarComponent,
    MatTableModule,
    MatIcon
  ],
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['nombre', 'apellido', 'numeroDeCuenta', 'rol', 'isActive'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private appService: AppService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.appService.getUsuarios().subscribe((usuarios) => {
      this.dataSource.data = usuarios;
      this.dataSource.paginator = this.paginator;
    });
  }

  openEditDialog(usuario: any): void {
    const dialogRef = this.dialog.open(EditUsuarioDialogComponent, {
      width: '500px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(EditUsuarioDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }
}