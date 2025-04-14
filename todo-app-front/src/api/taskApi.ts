import { Task } from '../types/task';

const API_URL = 'http://localhost:8000/api'; 

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) throw new Error('Erreur lors du chargement des tâches');
  return await response.json();
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(task)
  });
  
  if (!response.ok) throw new Error('Erreur lors de la création');
  return await response.json();
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(task)
  });
  
  if (!response.ok) throw new Error('Erreur lors de la mise à jour');
  return await response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!response.ok) throw new Error('Erreur lors de la suppression');
};

export const toggleTaskStatus = async (id: number): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });
  
  if (!response.ok) throw new Error('Erreur lors du changement de statut');
  return await response.json();
};