export interface IAuthService {
  validateUser(email: string, password: string): Promise<any>;
  login(email: string, password: string): Promise<{ access_token: string }>;
}
