import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateUsername = (username: string) => {
    return username.length >= 3;
  };

  const [success, setSuccess] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    let error = '';
    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email est requis';
        } else if (!validateEmail(value)) {
          error = 'Email invalide';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Mot de passe est requis';
        } else if (!validatePassword(value)) {
          error = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Les mots de passe ne correspondent pas';
        }
        break;
      case 'username':
        if (!value) {
          error = "Nom d'utilisateur est requis";
        } else if (!validateUsername(value)) {
          error = "Le nom d'utilisateur doit contenir au moins 3 caractères";
        }
        break;
      default:
        break;
    }

    let successMessage = '';
    switch (name) {
      case 'email':
        if (validateEmail(value)) {
          successMessage = '✅ Votre adresse email est parfaite';
        }
        break;
      case 'username':
        if (validateUsername(value)) {
          successMessage = "✅ Votre nom d'utilisateur est parfait";
        }
        break;
      case 'password':
        if (validatePassword(value)) {
          successMessage = '✅ Votre mot de passe est parfait';
        }
        break;
      default:
        break;
    }

    setSuccess({
      ...success,
      [name]: successMessage
    });

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = 'Email est requis';
      formIsValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email invalide';
      formIsValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe est requis';
      formIsValid = false;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', formData);

        localStorage.setItem('authToken', response.data.token);

        navigate('/dashboard');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrors(error.response.data.errors || {});
        }
      }
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50"></div>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Créer un compte</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
            {success.username && <p className="mt-2 text-sm text-green-600">{success.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            {success.email && <p className="mt-2 text-sm text-green-600">{success.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            {success.password && <p className="mt-2 text-sm text-green-600">{success.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              S'inscrire
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Déjà un compte?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;