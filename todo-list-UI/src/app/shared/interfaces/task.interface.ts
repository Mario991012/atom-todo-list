export interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date | number;
  completed: boolean;
}

export interface TaskListResponse {
  returnCode: number;
  data: Task[];
  error?: any;
}
