import { Routes } from '@angular/router';

export const CERTIFICADO_LABORAL_HISTORICO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/certificado-laboral-historico-list/certificado-laboral-historico-list.component').then(
        (m) => m.CertificadoLaboralHistoricoListComponent,
      ),
  },
];
