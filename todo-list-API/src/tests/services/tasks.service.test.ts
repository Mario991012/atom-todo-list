import FirestoreService from "../../common/providers/firestore.service";
import {
  mapCreatedTaskResponse,
  mapTaskListResponse,
  mapUpdatedTaskResponse,
} from "../../mappers/tasks.mapper";
import { FIRESTORE_COLLECTIONS } from "../../common/constants/tables";
import { TasksService } from "../../services/tasks.service";

jest.mock("../../common/providers/firestore.service");
jest.mock("../../mappers/tasks.mapper");

describe("TasksService", () => {
  let tasksService: TasksService;

  beforeEach(() => {
    tasksService = new TasksService(); 
    jest.clearAllMocks();
  });

  describe("getAllTasks", () => {
    it("should retrieve all tasks that are not deleted and map the response", async () => {
      const tasksMock = [
        { id: 1, title: "Task 1", isDeleted: false },
        { id: 2, title: "Task 2", isDeleted: true },
        { id: 3, title: "Task 3", isDeleted: false },
      ];
      const mappedResponseMock = [{ id: 1, title: "Task 1" }, { id: 3, title: "Task 3" }];
      
      (FirestoreService.getAll as jest.Mock).mockResolvedValue(tasksMock);
      (mapTaskListResponse as jest.Mock).mockReturnValue(mappedResponseMock);

      const result = await tasksService.getAllTasks();

      expect(FirestoreService.getAll).toHaveBeenCalledWith(FIRESTORE_COLLECTIONS.TASKS_COLLECTION);
      expect(mapTaskListResponse).toHaveBeenCalledWith([tasksMock[0], tasksMock[2]]);
      expect(result).toEqual(mappedResponseMock);
    });
  });

  describe("createTask", () => {
    it("should create a task and map the response", async () => {
      const taskMock = { title: "New Task", description: "Task description" };
      const createdTaskMock = { id: 1, ...taskMock };
      const mappedResponseMock = { id: 1, title: "New Task" };

      (FirestoreService.create as jest.Mock).mockResolvedValue(createdTaskMock);
      (mapCreatedTaskResponse as jest.Mock).mockReturnValue(mappedResponseMock);

      const result = await tasksService.createTask(taskMock);

      expect(FirestoreService.create).toHaveBeenCalledWith(FIRESTORE_COLLECTIONS.TASKS_COLLECTION, taskMock);
      expect(mapCreatedTaskResponse).toHaveBeenCalledWith(createdTaskMock);
      expect(result).toEqual(mappedResponseMock);
    });
  });

  describe("updateTask", () => {
    it("should update a task and map the response", async () => {
      const id = "1";
      const updatedTaskMock = { title: "Updated Task" };
      const mappedResponseMock = { success: true };

      (FirestoreService.update as jest.Mock).mockResolvedValue(undefined);
      (mapUpdatedTaskResponse as jest.Mock).mockReturnValue(mappedResponseMock);

      const result = await tasksService.updateTask(id, updatedTaskMock);

      expect(FirestoreService.update).toHaveBeenCalledWith(FIRESTORE_COLLECTIONS.TASKS_COLLECTION, id, updatedTaskMock);
      expect(mapUpdatedTaskResponse).toHaveBeenCalled();
      expect(result).toEqual(mappedResponseMock);
    });
  });

  describe("deleteTask", () => {
    it("should mark a task as deleted and map the response", async () => {
      const id = "1";
      const mappedResponseMock = { success: true };

      (FirestoreService.update as jest.Mock).mockResolvedValue(undefined);
      (mapUpdatedTaskResponse as jest.Mock).mockReturnValue(mappedResponseMock);

      const result = await tasksService.deleteTask(id);

      expect(FirestoreService.update).toHaveBeenCalledWith(FIRESTORE_COLLECTIONS.TASKS_COLLECTION, id, { isDeleted: true });
      expect(mapUpdatedTaskResponse).toHaveBeenCalled();
      expect(result).toEqual(mappedResponseMock);
    });
  });
});
