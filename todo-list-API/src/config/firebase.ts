import * as admin from "firebase-admin";
import {defineSecret} from "firebase-functions/params";
import * as dotenv from "dotenv";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId:
      defineSecret("FIREBASE_PROJECT_ID").value() ||
      process.env.FIREBASE_PROJECT_ID,
    privateKey: (
      defineSecret("FIREBASE_PRIVATE_KEY").value() ||
      process.env.FIREBASE_PRIVATE_KEY
    )?.replace(/\\n/g, "\n"),
    clientEmail:
      defineSecret("FIREBASE_CLIENT_EMAIL").value() ||
      process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

export default admin;
