import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Register from './Register'

function App() {
 

  return (
    <>
    <BrowserRouter>
      <Dashboard />
      <Login />
      <Register />
    </BrowserRouter>
    </>
  )
}

export default App
