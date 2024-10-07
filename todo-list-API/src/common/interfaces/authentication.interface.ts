export interface IAuthenticationService {
  createUser(
    email: string,
  ): Promise<any>;
  signIn(email: string): Promise<any>;
}
