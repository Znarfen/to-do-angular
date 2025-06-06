export interface Task {
  name: string;
  id: number;
  description: string;
  priority: number;
  editMode: boolean;
  status: number;
  deadline: {
    d: number;
    m: number;
    y: number;
  }
}