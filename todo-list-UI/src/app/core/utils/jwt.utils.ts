import { jwtDecode } from "jwt-decode";
import { JWTDecoded } from "../../shared/interfaces/jwt-token.interface";

/**
 * Decodes a given JWT token and returns its payload.
 * 
 * @param token - The JWT token to decode.
 * @returns The decoded token payload as an object, or `null` if the decoding fails.
 * 
 * @example
 * ```
 * const decodedToken = decodeToken('your-jwt-token');
 * if (decodedToken) {
 *   console.log('Token decoded successfully', decodedToken);
 * } else {
 *   console.log('Invalid token');
 * }
 * ```
 */
export const decodeToken = (token: string): any => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

/**
 * Checks if a decoded JWT token is expired based on its `exp` property.
 * 
 * @param decodedToken - The decoded JWT token object containing an `exp` property.
 * @returns `true` if the token is expired, `false` otherwise.
 * 
 * @example
 * ```
 * const decodedToken = decodeToken('your-jwt-token');
 * const isExpired = tokenIsExpired(decodedToken);
 * console.log(isExpired ? 'Token is expired' : 'Token is still valid');
 * ```
 */
export const tokenIsExpired = (decodedToken: JWTDecoded): boolean => {
  if (!decodedToken || !decodedToken.exp) {
    return false;
  }
  const expirationTime = decodedToken.exp * 1000;
  return Date.now() >= expirationTime;
};
