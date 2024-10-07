import {auth} from "../../config/firebase.config";
import {IAuthenticationService} from "../interfaces/authentication.interface";

class AuthenticationService implements IAuthenticationService {
  /**
   * Create a new user using Firebase Admin SDK.
   * Only requires the email, no password or display name.
   * @param email User's email.
   */
  async createUser(email: string): Promise<any> {
    try {
      const userRecord = await auth.createUser({
        email,
      });

      const customToken = await auth.createCustomToken(userRecord.uid);

      return {user: userRecord, token: customToken};
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Sign in a user by checking if they exist in Firebase.
   * No password validation is needed.
   * @param email User's email.
   */
  async signIn(email: string): Promise<any> {
    try {
      const userRecord = await auth.getUserByEmail(email);

      if (!userRecord) {
        throw new Error("User does not exist");
      }

      const customToken = await auth.createCustomToken(userRecord.uid);

      return {user: userRecord, token: customToken};
    } catch (error: any) {
      throw new Error(`Error during login: ${error.message}`);
    }
  }
}

export {
  AuthenticationService,
};
