import {UserRecord} from "firebase-admin/lib/auth/user-record";

export interface IAuthenticationService {
  createUser(
    email: string,
  ): Promise<any>;
  signIn(email: string): Promise<any>;
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
