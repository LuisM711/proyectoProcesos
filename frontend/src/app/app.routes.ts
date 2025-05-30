import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MateriasComponent } from './components/materias/materias.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { DocentesComponent } from './components/docentes/docentes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { RegistrarAsistenciaComponent } from './components/registrar-asistencia/registrar-asistencia.component';
import { MisAsistenciasComponent } from './components/mis-asistencias/mis-asistencias.component';

import { verificarGuard, verificarGuardAdmin, verificarGuardDocente } from './verificar.guard';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrar-asistencia', component: RegistrarAsistenciaComponent, canActivate: [verificarGuard] },
    {
        path: 'admin', children: [
            { path: '', component: AdminComponent, canActivate: [verificarGuardAdmin] },
            { path: 'usuarios', component: UsuariosComponent, canActivate: [verificarGuardAdmin] },
            { path: 'materias', component: MateriasComponent, canActivate: [verificarGuardAdmin] },
            { path: 'grupos', component: GruposComponent, canActivate: [verificarGuardAdmin] },
            { path: 'docentes', component: DocentesComponent, canActivate: [verificarGuardAdmin] },
            { path: 'reportes', component: ReportesComponent, canActivate: [verificarGuardAdmin] }
            // { path: 'dashboard', component: DashboardComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'extras', component: ExtrasComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'garantias', component: GarantiasComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'inventario', component: InventarioComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'pedidos-pendientes', component: PedidosPendientesComponent, canActivate: [verificarGuard] },
        ]
    },
    {path: 'mis-asistencias', component: MisAsistenciasComponent, canActivate: [verificarGuardDocente]},




    { path: '**', redirectTo: '' }

];
