import { Task, TaskListResponse } from '../shared/interfaces/task.interface';

export const mapUserListResponse = (response: TaskListResponse): Task[] => {
  return response?.data;
};
