import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';


export const verificarGuard: CanActivateFn = (route, state) => {
    const appService = inject(AppService);
    const router = inject(Router);
    const snackBar = inject(MatSnackBar);
    return appService.getInfo().toPromise().then(
        (data) => {
            console.log(data);
            if (data.error) {
                snackBar.open('Debes iniciar sesión para acceder a esta página.', 'Cerrar', {
                    duration: 3000,
                });
                return router.navigate(['/login']);
            }
            return true;
        },
        (error: any) => {
            snackBar.open('Ha ocurrido un error al momento de tratar de ingresar a la página.', 'Cerrar', {
                duration: 3000,
            });
            console.error("Error al verificar:", error);
            return false;
        }
    );
};
export const verificarGuardAdmin: CanActivateFn = (route, state) => {
    const appService = inject(AppService);
    const router = inject(Router);
    const snackBar = inject(MatSnackBar);

    return appService.getInfo().toPromise().then(
        (data) => {
            console.log(data);
            if (data.error) {
                snackBar.open('Debes iniciar sesión y tener rol de administrador para acceder a esta página.', 'Cerrar', {
                    duration: 3000,
                });
                return router.navigate(['/login']);
            }
            if (data.rolId != 1) {
                snackBar.open('No tienes los permisos necesarios para ingresar a esta página.', 'Cerrar', {
                    duration: 3000,
                });
                return router.navigate(['/login']);
            }
            return true;
        },
        (error: any) => {
            snackBar.open('Ha ocurrido un error al momento de tratar de ingresar a la página.', 'Cerrar', {
                duration: 3000,
            });
            console.error("Error al verificar:", error);
            return false;
        }
    );
};
export const verificarGuardDocente: CanActivateFn = (route, state) => {
    const appService = inject(AppService);
    const router = inject(Router);
    const snackBar = inject(MatSnackBar);

    return appService.getInfo().toPromise().then(
        (data) => {
            console.log(data);
            if (data.error) {
                snackBar.open('Debes iniciar sesión y tener rol de docente para acceder a esta página.', 'Cerrar', {
                    duration: 3000,
                });
                return router.navigate(['/login']);
            }
            if (data.rolId != 4) {
                snackBar.open('No tienes los permisos necesarios para ingresar a esta página.', 'Cerrar', {
                    duration: 3000,
                });
                return router.navigate(['/login']);
            }
            return true;
        },
        (error: any) => {
            snackBar.open('Ha ocurrido un error al momento de tratar de ingresar a la página.', 'Cerrar', {
                duration: 3000,
            });
            console.error("Error al verificar:", error);
            return false;
        }
    );
}