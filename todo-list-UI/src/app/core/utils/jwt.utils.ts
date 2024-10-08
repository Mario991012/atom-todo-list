import { jwtDecode } from "jwt-decode";
import { JWTDecoded } from "../../shared/interfaces/jwt-token.interface";

export const decodeToken = (token: string): any => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const tokenIsExpired = (decodedToken: JWTDecoded): boolean => {
  if (!decodedToken || !decodedToken.exp) {
    return false;
  }
  const expirationTime = decodedToken.exp * 1000;
  return Date.now() >= expirationTime;
};
