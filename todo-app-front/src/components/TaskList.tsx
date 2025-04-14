import { useState, useEffect } from 'react';
import { Task} from '../types/task';
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';
import { 
   
  createTask, 
  updateTask, 
  deleteTask, 
  toggleTaskStatus 
} from '../api/taskApi';

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  // Fonction pour charger les tâches
  const fetchTasks = async () => {
    try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('http://localhost:8000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Accept': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
    
        // Vérifiez que la réponse n'est pas vide avant de parser
        const text = await response.text();
        const data = text ? JSON.parse(text) : [];
        
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        console.error('Erreur fetch:', err);
        setTasks([]); // Réinitialise les tâches en cas d'erreur
      } finally {
        setLoading(false);
      }
  };

  // Chargement initial des tâches
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (task: { title: string; description?: string }) => {
    try {
      const newTask = await createTask({ ...task, completed: false });
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la création');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const updatedTask = await toggleTaskStatus(id);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du changement de statut');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  const handleUpdateTask = async (id: number, updates: Partial<Task>) => {
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded"
      >
        Réessayer
      </button>
    </div>
  );

  return (
     <div>
    {loading ? (
      <p>Chargement...</p>
    ) : error ? (
      <div className="text-red-500">
        Erreur: {error}
        <button onClick={() => window.location.reload()} className="ml-2 text-blue-500">
          Réessayer
        </button>
      </div>
    ): (

    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Gestionnaire de Tâches</h1>
      
      <TaskForm onSubmit={handleAddTask} />
      
      <div className="flex justify-center space-x-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Actives
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Terminées
        </button>
      </div>
      
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 py-6">Aucune tâche {filter === 'all' ? '' : filter === 'completed' ? 'terminée' : 'active'}</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleStatus}
            onDelete={handleDeleteTask}
            onUpdate={(id, { title, description }) => 
              handleUpdateTask(id, { title, description })
            } />
          ))
        )}
      </div>
    </div>
    )}
    </div>
  );
};