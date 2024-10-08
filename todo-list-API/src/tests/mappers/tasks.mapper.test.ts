import {
  mapTaskListResponse,
  mapCreatedTaskResponse,
  mapUpdatedTaskResponse,
} from "../../mappers/tasks.mapper";
import {RETURN_CODES} from "../../common/constants/common";
import {TaskModel} from "../../common/interfaces/task.interface";

describe("Tasks Mappers", () => {
  describe("mapTaskListResponse", () => {
    it("should return a DTO with the provided tasks", () => {
      const tasksMock: TaskModel[] = [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          isDeleted: false,
          createdAt: 12345,
          completed: false,
        },
        {
          id: "2",
          title: "Task 2",
          description: "Description 2",
          isDeleted: false,
          createdAt: 12346,
          completed: true,
        },
      ];

      const result = mapTaskListResponse(tasksMock);

      expect(result).toEqual({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        data: tasksMock,
      });
    });

    it("should return DTO with the tasks and specified returnCode", () => {
      const tasksMock: TaskModel[] = [
        {
          id: "1",
          title: "Task 1",
          description: "Description 1",
          isDeleted: false,
          createdAt: 12345,
          completed: false,
        },
        {
          id: "2",
          title: "Task 2",
          description: "Description 2",
          isDeleted: false,
          createdAt: 12346,
          completed: true,
        },
      ];

      const result = mapTaskListResponse(tasksMock, RETURN_CODES.GENERIC_ERROR);

      expect(result).toEqual({
        returnCode: RETURN_CODES.GENERIC_ERROR,
        data: tasksMock,
      });
    });
  });

  describe("mapCreatedTaskResponse", () => {
    it("should return a DTO with the provided task", () => {
      const taskMock: TaskModel = {
        id: "1",
        title: "New Task",
        description: "New task description",
        isDeleted: false,
        createdAt: 12345,
        completed: false,
      };

      const result = mapCreatedTaskResponse(taskMock);

      expect(result).toEqual({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
        data: taskMock,
      });
    });

    it("should return a DTO with the task and specified returnCode", () => {
      const taskMock: TaskModel = {
        id: "1",
        title: "New Task",
        description: "New task description",
        isDeleted: false,
        createdAt: 12345,
        completed: false,
      };

      const result = mapCreatedTaskResponse(
        taskMock,
        RETURN_CODES.GENERIC_ERROR
      );

      expect(result).toEqual({
        returnCode: RETURN_CODES.GENERIC_ERROR,
        data: taskMock,
      });
    });
  });

  describe("mapUpdatedTaskResponse", () => {
    it("should return an DTO with the default return code", () => {
      const result = mapUpdatedTaskResponse();

      expect(result).toEqual({
        returnCode: RETURN_CODES.GENERIC_SUCCESS,
      });
    });

    it("should return an resp DTO with the specified return code", () => {
      const result = mapUpdatedTaskResponse(RETURN_CODES.GENERIC_ERROR);

      expect(result).toEqual({
        returnCode: RETURN_CODES.GENERIC_ERROR,
      });
    });
  });
});
