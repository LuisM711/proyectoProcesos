import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminComponent } from "../admin/admin.component";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [SidebarComponent, AdminComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

}
