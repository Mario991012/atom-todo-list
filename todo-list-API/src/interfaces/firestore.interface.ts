import {DocumentData, WithFieldValue} from "firebase-admin/firestore";

export interface IFirestoreService {
  getAll(collection: string): Promise<any[]>;
  create(
    collection: string,
    data: WithFieldValue<DocumentData>
  ): Promise<{ id: string; data: WithFieldValue<DocumentData> }>;
  update(
    collection: string,
    id: string,
    data: WithFieldValue<DocumentData>
  ): Promise<{ id: string; data: DocumentData; message: string }>;
}
