import { Routes } from '@angular/router';

export const SEGURIDAD_SOCIAL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/seguridad-social-list/seguridad-social-list.component').then(
        (m) => m.SeguridadSocialListComponent,
      ),
  },
];
