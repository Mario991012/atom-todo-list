import FirestoreService from "../common/providers/firestore.service";
import {FIRESTORE_COLLECTIONS} from "../common/constants/tables";
import {
  mapCreatedTaskResponse,
  mapTaskListResponse,
  mapUpdatedTaskResponse,
} from "../mappers/tasks.mapper";
import {TaskModel} from "../common/interfaces/task.interface";

class TasksService {
  async getAllTasks() {
    const tasks = await FirestoreService.getAll(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION
    );
    return mapTaskListResponse(tasks.filter((task: any) => !task.isDeleted));
  }

  async createTask(task: any) {
    const createdTask = (await FirestoreService.create(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      task
    )) as unknown as TaskModel;
    return mapCreatedTaskResponse(createdTask);
  }

  async updateTask(id: string, updatedTask: any) {
    await FirestoreService.update(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      id,
      updatedTask
    );
    return mapUpdatedTaskResponse();
  }

  async deleteTask(id: string) {
    await FirestoreService.update(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      id,
      {isDeleted: true}
    );
    return mapUpdatedTaskResponse();
  }
}

export default new TasksService();
