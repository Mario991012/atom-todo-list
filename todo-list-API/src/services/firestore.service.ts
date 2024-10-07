import firebase from "../config/firebase";
import {
  DocumentData,
  Firestore,
  WithFieldValue,
} from "firebase-admin/firestore";

class FirestoreService {
  private firestore: Firestore;

  constructor() {
    this.firestore = firebase.firestore();
  }

  async getAll<T>(collection: string): Promise<T[]> {
    const snapshot = await this.firestore.collection(collection).get();
    return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as T));
  }

  async create(
    collection: string,
    data: WithFieldValue<DocumentData>
  ): Promise<{ id: string; data: WithFieldValue<DocumentData> }> {
    const docRef = await this.firestore.collection(collection).add(data);
    const doc = await docRef.get();
    return {id: docRef.id, ...doc.data()} as {
      id: string;
      data: WithFieldValue<DocumentData>;
    };
  }

  async update<T>(
    collection: string,
    id: string,
    data: WithFieldValue<DocumentData>
  ): Promise<void> {
    await this.firestore.collection(collection).doc(id).update(data);
  }
}

export default new FirestoreService();
