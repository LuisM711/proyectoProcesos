import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { environment } from '../../app.environment';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  environment = environment;

}
