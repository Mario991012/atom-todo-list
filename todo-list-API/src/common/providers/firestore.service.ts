import {DocumentData, WithFieldValue} from "firebase-admin/firestore";
import {firestore} from "../../config/firebase.config";
import {IFirestoreService} from "../interfaces/firestore.interface";
import {logger} from "firebase-functions/v2";

class FirestoreService implements IFirestoreService {
  /**
   * Retrieve all documents from a collection.
   * @param collection Collection name.
   * @returns List of documents in the collection or empty array if none found.
   */
  async getAll<T>(collection: string): Promise<T[]> {
    if (!collection) {
      throw new Error("Collection name is required.");
    }

    try {
      const snapshot = await firestore.collection(collection).get();

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (error: unknown) {
      logger.error(
        `Error fetching documents from collection: ${collection}`,
        error
      );
      throw new Error(
        `Failed to retrieve documents: ${(error as Error).message}`
      );
    }
  }

  /**
   * Create a new document in a collection.
   * @param collection Collection name.
   * @param data Document data.
   * @returns Created document ID and data.
   */
  async create(
    collection: string,
    data: WithFieldValue<DocumentData>
  ): Promise<{ id: string; data: WithFieldValue<DocumentData> }> {
    if (!collection) {
      throw new Error("Collection name is required.");
    }

    if (!data) {
      throw new Error("Document data is required.");
    }

    try {
      const docRef = await firestore.collection(collection).add(data);
      const doc = await docRef.get();

      return {
        id: docRef.id,
        data: doc.data() as WithFieldValue<DocumentData>,
      };
    } catch (error: unknown) {
      logger.error(
        `Error creating document in collection: ${collection}`,
        error
      );
      throw new Error(`Failed to create document: ${(error as Error).message}`);
    }
  }

  /**
   * Update an existing document and return the updated document.
   * @param collection Collection name.
   * @param id Document ID.
   * @param data Updated document data.
   * @returns Updated document data and success message.
   */
  async update(
    collection: string,
    id: string,
    data: WithFieldValue<DocumentData>
  ): Promise<{ id: string; data: DocumentData; message: string }> {
    if (!collection) {
      throw new Error("Collection name is required.");
    }

    if (!id) {
      throw new Error("Document ID is required.");
    }

    if (!data) {
      throw new Error("Updated document data is required.");
    }

    try {
      await firestore.collection(collection).doc(id).update(data);

      const updatedDoc = await firestore.collection(collection).doc(id).get();

      return {
        id: updatedDoc.id,
        data: updatedDoc.data() as DocumentData,
        message: `Document with ID ${id} updated successfully.`,
      };
    } catch (error: unknown) {
      logger.error(
        `Error updating document in collection: ${collection} with ID: ${id}`,
        error
      );
      throw new Error(`Failed to update document: ${(error as Error).message}`);
    }
  }
}

export default new FirestoreService();
