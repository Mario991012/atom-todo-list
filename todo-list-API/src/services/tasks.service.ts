import FirestoreService from "../common/providers/firestore.service";
import {FIRESTORE_COLLECTIONS} from "../common/constants/tables";
import {
  mapCreatedTaskResponse,
  mapTaskListResponse,
  mapUpdatedTaskResponse,
} from "../mappers/tasks.mapper";
import {TaskModel} from "../common/interfaces/task.interface";

export class TasksService {
  async getAllTasks() {
    const tasks = await FirestoreService.getAll<TaskModel>(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION
    );
    return mapTaskListResponse(
      tasks.filter((task: TaskModel) => !task.isDeleted)
    );
  }

  async createTask(task: TaskModel) {
    const createdTask = (await FirestoreService.create(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      task
    )) as unknown as TaskModel;
    return mapCreatedTaskResponse(createdTask);
  }

  async updateTask(id: string, updatedTask: TaskModel) {
    await FirestoreService.update(
      FIRESTORE_COLLECTIONS.TASKS_COLLECTION,
      id,
      updatedTask
    );
    return mapUpdatedTaskResponse();
  }

  async deleteTask(id: string) {
    await FirestoreService.update(FIRESTORE_COLLECTIONS.TASKS_COLLECTION, id, {
      isDeleted: true,
    });
    return mapUpdatedTaskResponse();
  }
}

export default new TasksService();
