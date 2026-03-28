export const ROUTE_PATHS = {
  auth: {
    login: '/auth/login',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/restablecer-clave',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
  },
  dashboard: {
    root: '/dashboard',
    inicio: '/dashboard/inicio',
    pagos: '/dashboard/pagos',
    reclamos: '/dashboard/reclamos',
    solicitudes: '/dashboard/solicitudes',
    capacitaciones: '/dashboard/capacitaciones',
    certificadoLaboral: '/dashboard/certificado-laboral',
    certificadoLaboralHistorico: '/dashboard/certificado-laboral-historico',
    autorizacionArma: '/dashboard/autorizacion-arma',
    seguridadSocial: '/dashboard/seguridad-social',
    turnos: '/dashboard/turnos',
    creditos: '/dashboard/creditos',
    anticipoNomina: '/dashboard/anticipo-nomina',
  },
  legal: {
    politicaPrivacidad: '/politica-de-privacidad',
    terminosUso: '/terminos-de-uso',
  },
} as const;
