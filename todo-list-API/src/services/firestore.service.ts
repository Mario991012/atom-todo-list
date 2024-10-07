import {
  DocumentData,
  WithFieldValue,
} from "firebase-admin/firestore";
import {admin} from "../config/firebase.config";
import {IFirestoreService} from "../interfaces/firestore.interface";
import { logger } from "firebase-functions/v2";

class FirestoreService implements IFirestoreService {
  private firestore = admin.firestore();

  /**
   * Retrieve all documents from a collection.
   * @param collection Collection name.
   * @returns List of documents in the collection or empty array if none found.
   */
  async getAll(collection: string): Promise<any[]> {
    if (!collection) {
      throw new Error("Collection name is required.");
    }

    try {
      const snapshot = await this.firestore.collection(collection).get();

      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error: any) {
      logger.error(
        `Error fetching documents from collection: ${collection}`,
        error
      );
      throw new Error(`Failed to retrieve documents: ${error.message}`);
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
      const docRef = await this.firestore.collection(collection).add(data);
      const doc = await docRef.get();

      return {
        id: docRef.id,
        data: doc.data() as WithFieldValue<DocumentData>,
      };
    } catch (error: any) {
      logger.error(
        `Error creating document in collection: ${collection}`,
        error
      );
      throw new Error(`Failed to create document: ${error.message}`);
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
      // Perform the update
      await this.firestore.collection(collection).doc(id).update(data);

      // Fetch the updated document
      const updatedDoc = await this.firestore
        .collection(collection)
        .doc(id)
        .get();

      // Return the updated document and a success message
      return {
        id: updatedDoc.id,
        data: updatedDoc.data() as DocumentData,
        message: `Document with ID ${id} updated successfully.`,
      };
    } catch (error: any) {
      logger.error(
        `Error updating document in collection: ${collection} with ID: ${id}`,
        error
      );
      throw new Error(`Failed to update document: ${error.message}`);
    }
  }
}

export default new FirestoreService();
