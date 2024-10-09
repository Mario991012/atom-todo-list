import {UserRecord} from "firebase-admin/lib/auth/user-record";

export interface IAuthenticationService {
  createUser(
    email: string,
  ): Promise<AuthenticationResponseModel>;
  signIn(email: string): Promise<AuthenticationResponseModel>;
}

export interface AuthenticationResponseModel {
  user: UserRecord;
  token: string;
}

export interface AuthenticationDTO {
  returnCode: number;
  data: AuthenticationResult;
}

export interface AuthenticationResult {
  id: string;
  email?: string;
  disabled: boolean;
  token: string;
}
