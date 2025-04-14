export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  }
export interface TaskItemProps {
        task: Task;
        onToggle: (id: number) => void;
        onDelete: (id: number) => void;
        onUpdate: (id: number, updates: { title: string; description?: string }) => void;
    }