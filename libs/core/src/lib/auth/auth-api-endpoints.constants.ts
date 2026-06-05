import { AuthApiEndpoints } from './base-auth.service';

const AUTH = '/auth/seguridad';
const USER = '/auth/user';

/** Endpoints de autenticacion compartidos por todas las apps del monorepo. */
export const AUTH_API_ENDPOINTS: AuthApiEndpoints = {
  login: `${AUTH}/login`,
  logout: `${AUTH}/logout`,
  refresh: `${AUTH}/refresh`,
  me: `${AUTH}/me`,
  forgotPassword: `${USER}/recuperar-clave`,
  resetPassword: `${USER}/restablecer-clave`,
  resendVerification: `${USER}/reenviar-verificacion`,
  verifyEmail: `${USER}/verificar`,
};
