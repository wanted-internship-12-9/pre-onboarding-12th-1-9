export interface TodoRequest {
  todo: string;
}

export interface TodoResponse {
  id: number;
  todo: string;
  isCompleted: boolean;
}
