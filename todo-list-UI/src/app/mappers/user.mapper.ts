import { Task, TaskListResponse } from '../shared/interfaces/task.interface';

/**
 * Maps a `TaskListResponse` to an array of `Task` objects.
 * Extracts the `data` property from the response, which contains the list of tasks.
 * 
 * @param response - The `TaskListResponse` object containing task data.
 * @returns An array of `Task` objects, or `undefined` if the response is not properly structured.
 * 
 * @example
 * ```
 * const response: TaskListResponse = {
 *   data: [
 *     { id: '1', title: 'Task 1', completed: false },
 *     { id: '2', title: 'Task 2', completed: true },
 *   ]
 * };
 * const tasks = mapUserListResponse(response);
 * ```
 */
export const mapUserListResponse = (response: TaskListResponse): Task[] => {
  return response?.data;
};
