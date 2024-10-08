export interface JWTDecoded {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  uid: string;
}
