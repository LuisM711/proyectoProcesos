import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

import { verificarGuard, verificarGuardAdmin } from './verificar.guard';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin', children: [
            { path: '', component: AdminComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'dashboard', component: DashboardComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'extras', component: ExtrasComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'garantias', component: GarantiasComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'inventario', component: InventarioComponent, canActivate: [verificarGuardAdmin] },
            // { path: 'pedidos-pendientes', component: PedidosPendientesComponent, canActivate: [verificarGuard] },
        ]
    },




    { path: '**', redirectTo: '' }

];
