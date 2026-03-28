import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface SemanticaEnvironment {
  apiUrl: string;
  turnstileSiteKey: string;
}

export interface RoutePaths {
  auth: { login: string };
  dashboard: { root: string };
}

export interface AuthServiceContract {
  isAuthenticated: () => boolean;
  refresh: () => Observable<unknown>;
  clearSession: () => void;
}

export const ENVIRONMENT = new InjectionToken<SemanticaEnvironment>('SemanticaEnvironment');
export const ROUTE_PATHS = new InjectionToken<RoutePaths>('RoutePaths');
export const AUTH_SERVICE = new InjectionToken<AuthServiceContract>('AuthService');
export const AUTH_SKIP_URLS = new InjectionToken<string[]>('AuthSkipUrls');
