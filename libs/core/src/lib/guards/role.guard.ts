import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AUTH_SERVICE, ROUTE_PATHS } from '../tokens';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AUTH_SERVICE);
  const router = inject(Router);
  const routePaths = inject(ROUTE_PATHS);

  const allowed: string[] = route.data['roles'] ?? [];
  const user = auth.currentUser();

  if (user && allowed.includes(user.role)) return true;

  return router.createUrlTree([routePaths.dashboard.root]);
};
