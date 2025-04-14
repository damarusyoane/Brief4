import apiClient from '../api/client';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  tags?: number[];
}

export const TaskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await apiClient.get('/tasks');
    return response.data;
  },

  async createTask(taskData: Omit<Task, 'id'>): Promise<Task> {
    const response = await apiClient.post('/tasks', taskData);
    return response.data;
  },

  async updateTask(id: number, taskData: Partial<Task>): Promise<Task> {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  },

  async toggleTaskStatus(id: number): Promise<Task> {
    const response = await apiClient.patch(`/tasks/${id}/toggle`);
    return response.data;
  }
};