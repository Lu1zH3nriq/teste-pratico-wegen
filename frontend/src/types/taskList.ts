export type Taks = {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  category: string;
};

export type Colors = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
};

export interface TaskListProps {
  tasks: Taks[];
  colors: Colors;
  onTaskDeleted?: () => void;
  onTaskUpdated?: () => void;
}
