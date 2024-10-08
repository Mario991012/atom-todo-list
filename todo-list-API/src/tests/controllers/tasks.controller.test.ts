import {Request, Response} from "express";
import {logger} from "firebase-functions/v2";
import {TasksController} from "../../controllers/tasks.controller";
import {RETURN_CODES} from "../../common/constants/common";
import TasksService from "../../services/tasks.service";

jest.mock("../../services/tasks.service");
jest.mock("firebase-functions/v2", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe("TasksController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let tasksController: TasksController;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({json: jsonMock})) as any;
    res = {
      status: statusMock,
    } as Partial<Response>;

    tasksController = new TasksController();

    jest.clearAllMocks();
  });

  describe("getAllTasks", () => {
    it("should return all tasks with status 200", async () => {
      const tasksMock = [{id: 1, title: "Test task"}];
      (TasksService.getAllTasks as jest.Mock).mockResolvedValue(tasksMock);

      await tasksController.getAllTasks(req as Request, res as Response);

      expect(TasksService.getAllTasks).toHaveBeenCalled();
      expect(logger.info).toHaveBeenCalledWith("getAllTasks result", tasksMock);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(tasksMock);
    });

    it("should handle error and return status 500", async () => {
      const errorMessage = "Failed to get tasks";
      (TasksService.getAllTasks as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await tasksController.getAllTasks(req as Request, res as Response);

      expect(TasksService.getAllTasks).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "getAllTasks error",
        errorMessage
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: errorMessage,
        returnCode: RETURN_CODES.GENERIC_ERROR,
      });
    });
  });

  describe("createTask", () => {
    it("should create a new task and return status 201", async () => {
      const newTaskMock = {
        id: 1,
        title: "New Task",
        description: "Task description",
      };
      req.body = {
        title: "New Task",
        description: "Task description",
      };
      (TasksService.createTask as jest.Mock).mockResolvedValue(newTaskMock);

      await tasksController.createTask(req as Request, res as Response);

      expect(logger.info).toHaveBeenCalledWith(
        "Task to be created",
        expect.objectContaining({
          title: "New Task",
          description: "Task description",
          completed: false,
          isDeleted: false,
        })
      );
      expect(TasksService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "New Task",
          description: "Task description",
          completed: false,
          isDeleted: false,
        })
      );
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(newTaskMock);
    });

    it("should handle error and return status 500", async () => {
      const errorMessage = "Failed to create task";
      req.body = {
        title: "New Task",
        description: "Task description",
      };
      (TasksService.createTask as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await tasksController.createTask(req as Request, res as Response);

      expect(TasksService.createTask).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "getAllTasks error",
        expect.any(Error)
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: errorMessage,
        returnCode: RETURN_CODES.GENERIC_ERROR,
      });
    });
  });

  describe("updateTask", () => {
    it("should update the task and return status 200", async () => {
      const updatedTaskMock = {
        id: 1,
        title: "Updated Task",
        description: "Updated description",
      };
      req.params = {id: "1"};
      req.body = {
        title: "Updated Task",
        description: "Updated description",
        completed: true,
      };
      (TasksService.updateTask as jest.Mock).mockResolvedValue(updatedTaskMock);

      await tasksController.updateTask(req as Request, res as Response);

      expect(TasksService.updateTask).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({
          title: "Updated Task",
          description: "Updated description",
          completed: true,
        })
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(updatedTaskMock);
    });

    it("should handle error and return status 500", async () => {
      const errorMessage = "Failed to update task";
      req.params = {id: "1"};
      req.body = {
        title: "Updated Task",
        description: "Updated description",
        completed: true,
      };
      (TasksService.updateTask as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await tasksController.updateTask(req as Request, res as Response);

      expect(TasksService.updateTask).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "updateTask error",
        expect.any(Error)
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: errorMessage,
        returnCode: RETURN_CODES.GENERIC_ERROR,
      });
    });
  });

  describe("deleteTask", () => {
    it("should delete the task and return status 200", async () => {
      const deleteResultMock = {success: true};
      req.params = {id: "1"};
      (TasksService.deleteTask as jest.Mock).mockResolvedValue(
        deleteResultMock
      );

      await tasksController.deleteTask(req as Request, res as Response);

      expect(TasksService.deleteTask).toHaveBeenCalledWith("1");
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(deleteResultMock);
    });

    it("should handle error and return status 500", async () => {
      const errorMessage = "Failed to delete task";
      req.params = {id: "1"};
      (TasksService.deleteTask as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await tasksController.deleteTask(req as Request, res as Response);

      expect(TasksService.deleteTask).toHaveBeenCalledWith("1");
      expect(logger.error).toHaveBeenCalledWith(
        "deleteTask error",
        expect.any(Error)
      );
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: errorMessage,
        returnCode: RETURN_CODES.GENERIC_ERROR,
      });
    });
  });
});
