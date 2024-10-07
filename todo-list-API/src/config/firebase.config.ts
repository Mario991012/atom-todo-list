import * as admin from "firebase-admin";
import {initializeApp as initializeClientApp} from "firebase/app";
import * as dotenv from "dotenv";

dotenv.config();

const adminApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const clientApp = initializeClientApp({
  apiKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});

const auth = admin.auth();
const firestore = admin.firestore();
export {adminApp, firestore, auth, clientApp};
