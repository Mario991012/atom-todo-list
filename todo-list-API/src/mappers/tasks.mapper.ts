import {RETURN_CODES} from "../common/constants/common";
import {
  CreatedTaskResponseDTO,
  TaskModel,
  TaskResponseDTO,
  UpdatedTaskResponseDTO,
} from "../common/interfaces/task.interface";

export const mapTaskListResponse = (
  tasks: TaskModel[],
  returnCode?: RETURN_CODES,
): TaskResponseDTO => {
  return {
    returnCode: returnCode || RETURN_CODES.GENERIC_SUCCESS,
    data: tasks,
  };
};

export const mapCreatedTaskResponse = (
  task: TaskModel,
  returnCode?: RETURN_CODES,
): CreatedTaskResponseDTO => {
  return {
    returnCode: returnCode || RETURN_CODES.GENERIC_SUCCESS,
    data: task,
  };
};

export const mapUpdatedTaskResponse = (
  returnCode?: RETURN_CODES,
): UpdatedTaskResponseDTO => {
  return {
    returnCode: returnCode || RETURN_CODES.GENERIC_SUCCESS,
  };
};
