import FirebaseAuthenticationService from "../common/providers/firebase-authentication.service";
import { auth } from "../config/firebase.config";

class UsersService {
  private authService: FirebaseAuthenticationService;

  constructor() {
    this.authService = new FirebaseAuthenticationService();
  }

  /**
   * Create a new user by delegating the task to the authentication service.
   * @param email User's email.
   */
  async createUser(email: string): Promise<any> {
    try {
      return await this.authService.createUser(email);
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Check if a user exists using Firebase Authentication.
   * @param email User's email.
   */
  async findUserByEmail(email: string): Promise<any> {
    try {
      const userRecord = await auth.getUserByEmail(email);
      return userRecord;
    } catch (error: any) {
      throw new Error(`User not found: ${error.message}`);
    }
  }
}

export default UsersService;
