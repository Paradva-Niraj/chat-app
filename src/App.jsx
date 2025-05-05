import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Input from './components/input'
import ContactPanel from './components/ContactPanel'
import Register from './pages/Register'
import Login from './pages/Login'

const isAuthenticated = !!localStorage.getItem("token");

function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />

        <Route path='/login' element={<Login />} />
        <Route path='/' element={isAuthenticated ?
          (<div className='main'>
            <ContactPanel />
            <Input />
          </div>) : <Navigate to='/login' />
          }
          />
      </Routes>
    </Router>
  )
}

export default App
