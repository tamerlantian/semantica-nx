// Re-export shared core
export {
  authGuard,
  publicGuard,
  authInterceptor,
  errorInterceptor,
  ToastService,
  TokenRefreshService,
  BaseAuthService,
  extractErrorMessage,
  parseApiError,
  ENVIRONMENT,
  ROUTE_PATHS as ROUTE_PATHS_TOKEN,
  AUTH_SERVICE,
  AUTH_SKIP_URLS,
} from '@semantica/core';
export type {
  ApiError,
  ApiErrorResponse,
  BaseUsuario,
  AuthServiceContract,
  AuthApiEndpoints,
  SemanticaEnvironment,
  RoutePaths,
  LoginRequest,
  AuthResponse,
  ResendVerificationRequest,
} from '@semantica/core';

// App-specific exports
export { BaseHttpService } from './services/base-http.service';
export type { PaginatedResponse, QueryParams } from './services/base-http.service';
export { API_ENDPOINTS } from './constants/api-endpoints.constants';
export { ROUTE_PATHS } from './constants/route-paths.constants';
export { isSafeReturnUrl } from './utils/url.utils';
