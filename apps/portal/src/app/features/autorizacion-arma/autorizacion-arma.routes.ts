import { Routes } from '@angular/router';

export const AUTORIZACION_ARMA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/autorizacion-arma-list/autorizacion-arma-list.component').then(
        (m) => m.AutorizacionArmaListComponent,
      ),
  },
];
