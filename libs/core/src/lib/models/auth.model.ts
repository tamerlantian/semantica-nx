export interface BaseUsuario {
  id: number;
  email: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  client_type: 'api' | 'web';
  turnstile_token?: string;
}

export interface AuthResponse<TUser = BaseUsuario> {
  user: TUser;
}

export interface ResendVerificationRequest {
  email: string;
  turnstile_token: string;
}
