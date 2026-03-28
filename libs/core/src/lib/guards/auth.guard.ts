import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_SERVICE, ROUTE_PATHS } from '../tokens';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AUTH_SERVICE);
  const router = inject(Router);
  const routePaths = inject(ROUTE_PATHS);

  if (auth.isAuthenticated()) return true;

  const returnUrl = route.url.map((s) => s.path).join('/');
  return router.createUrlTree([routePaths.auth.login], { queryParams: { returnUrl } });
};
