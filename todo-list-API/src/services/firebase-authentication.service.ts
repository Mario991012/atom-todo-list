import {adminApp, firebaseClientApp} from "../config/firebase.config";
import {
  getAuth as getClientAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {getAuth as getAdminAuth} from "firebase-admin/auth";
import {IAuthenticationService} from "../interfaces/authentication.interface";

class FirebaseAuthenticationService implements IAuthenticationService {
  private clientAuth = getClientAuth(firebaseClientApp);

  /**
   * Create a new user using Firebase Admin SDK.
   * @param email User's email.
   * @param password User's password.
   * @param displayName Optional display name.
   */
  async createUser(
    email: string,
    password: string,
    displayName?: string
  ): Promise<any> {
    try {
      const userRecord = await getAdminAuth(adminApp).createUser({
        email,
        password,
        displayName,
      });

      const customToken = await getAdminAuth(adminApp).createCustomToken(
        userRecord.uid
      );

      return {user: userRecord, token: customToken};
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Sign in a user using Firebase Client SDK.
   * @param email User's email.
   * @param password User's password.
   */
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.clientAuth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      return {idToken, user: userCredential.user};
    } catch (error: any) {
      throw new Error(`Error during login: ${error.message}`);
    }
  }
}

export default FirebaseAuthenticationService;
