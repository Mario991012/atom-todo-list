import * as admin from "firebase-admin";
import {initializeApp as initializeClientApp} from "firebase/app";
import * as dotenv from "dotenv";
import {defineSecret} from "firebase-functions/params";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId:
      defineSecret("FIREBASE_PROJECT_ID").value() ||
      process.env.FIREBASE_PROJECT_ID,
    privateKey:
      defineSecret("FIREBASE_PRIVATE_KEY").value() ||
      process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail:
      defineSecret("FIREBASE_CLIENT_EMAIL").value() ||
      process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const firebaseClientConfig = {
  apiKey:
    defineSecret("FIREBASE_API_KEY").value() || process.env.FIREBASE_API_KEY,
  authDomain:
    defineSecret("FIREBASE_AUTH_DOMAIN").value() ||
    process.env.FIREBASE_AUTH_DOMAIN,
  projectId:
    defineSecret("FIREBASE_PROJECT_ID").value() ||
    process.env.FIREBASE_PROJECT_ID,
};

const firebaseClientApp = initializeClientApp(firebaseClientConfig);

export {admin, firebaseClientApp};
