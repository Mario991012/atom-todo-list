export interface TaskModel {
  id: string;
  createdAt?: number;
  isDeleted?: boolean;
  description: string;
  completed: boolean;
  title: string;
}

export interface TaskResponseDTO {
  returnCode: number;
  data: TaskModel[];
}

export interface CreatedTaskResponseDTO {
  returnCode: number;
  data: TaskModel;
}

export interface UpdatedTaskResponseDTO {
  returnCode: number;
}
