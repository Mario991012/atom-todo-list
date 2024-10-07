export interface IAuthenticationService {
  createUser(
    email: string,
    password: string,
    displayName?: string
  ): Promise<any>;
  signInWithEmailAndPassword(email: string, password: string): Promise<any>;
}
