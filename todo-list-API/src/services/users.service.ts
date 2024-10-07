import {logger} from "firebase-functions/v2";
import {RETURN_CODES} from "../common/constants/common";
import {AuthenticationDTO} from "../common/interfaces/authentication.interface";
import {GenericErrorDTO} from "../common/interfaces/generic-error.interface";
import {mapGenericError} from "../common/mappers/generic-error.mapper";
import {AuthenticationService} from "../common/providers/fb-auth.service";
import {mapAuthResponse} from "../mappers/users.mapper";

class UsersService {
  private authService: AuthenticationService;

  constructor() {
    this.authService = new AuthenticationService();
  }

  /**
   * Create a new user by delegating the task to the authentication service.
   * @param email User's email.
   */
  async createUser(
    email: string
  ): Promise<AuthenticationDTO | GenericErrorDTO> {
    try {
      const result = await this.authService.createUser(email);
      return mapAuthResponse(result, RETURN_CODES.GENERIC_SUCCESS);
    } catch (error: any) {
      logger.error(`Error creating user: ${error.message}`);
      return mapGenericError(error, RETURN_CODES.GENERIC_ERROR);
    }
  }

  /**
   * Check if a user exists using Firebase Authentication.
   * @param email User's email.
   */
  async findUserByEmail(
    email: string
  ): Promise<AuthenticationDTO | GenericErrorDTO> {
    try {
      const result = await this.authService.signIn(email);
      return mapAuthResponse(result, RETURN_CODES.GENERIC_SUCCESS);
    } catch (error: any) {
      logger.error(`User not found: ${error.message}`);
      return mapGenericError(error, RETURN_CODES.GENERIC_ERROR);
    }
  }
}

export default UsersService;
