import FirestoreService from "../common/providers/firestore.service";
import { FIRESTORE_COLLECTIONS } from "../common/constants/tables";

class TasksService {
  async getAllTasks() {
    const tasks = await FirestoreService.getAll(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION
    );
    return tasks.filter((task: any) => !task.isDeleted);
  }

  async createTask(task: any) {
    return await FirestoreService.create(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      task
    );
  }

  async updateTask(id: string, updatedTask: any) {
    return await FirestoreService.update(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      id,
      updatedTask
    );
  }

  async deleteTask(id: string) {
    return await FirestoreService.update(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      id,
      { isDeleted: true }
    );
  }
}

export default new TasksService();
