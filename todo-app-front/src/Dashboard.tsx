import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TaskForm} from './components/TaskForm';



const Dashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [tasks, setTasks] = useState<any[]>([]); // Ajoutez cet état
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Fonction pour ajouter une tâche
  const handleAddTask = async (taskData: Omit<{ title: string; description?: string; id: number; completed: boolean }, 'id' | 'completed'>) => {
    try {
      const token = localStorage.getItem('authToken');
      console.log('Envoi des données:', { 
        ...taskData, 
        completed: false 
      }); // Debug 1
  
      const response = await axios.post('http://localhost:8000/api/tasks', 
        {
          title: taskData.title,
          description: taskData.description,
          completed: false
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      console.log('Réponse API:', response.data); // Debug 2
      setTasks([...tasks, response.data]);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Détails erreur:', {
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
      }
      console.error('Erreur complète:', error);
    }
  };

  // Chargez aussi les tâches existantes
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Charge l'utilisateur
        const userResponse = await axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        // Charge les tâches
        const tasksResponse = await axios.get('http://localhost:8000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(tasksResponse.data);

      } catch (error) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');

    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } finally {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                Tableau de bord
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Déconnexion
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-blue-700"
              >
                {showForm ? 'Annuler' : '+ Nouvelle tâche'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Bienvenue, {user.name}!
              </h1>
              <p className="mt-2 text-gray-600">Email: {user.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;