import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Input from './components/Input'
import ContactPanel from './components/ContactPanel'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  const [selectedFriend, setSelectedFriend] = useState(null);
 const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path='/' element={isAuthenticated ?
          (<div className='main'>
            <ContactPanel onSelectFrd={setSelectedFriend} />
            <Input selectFrd={selectedFriend} />
          </div>) : <Navigate to='/login' />
          }
        />
        <Route path='/chat' element={isAuthenticated ?
          (<div className='main'>
            <ContactPanel onSelectFrd={setSelectedFriend} />
            <Input selectFrd={selectedFriend} />
          </div>) : <Navigate to='/login' />
          }
        />
      </Routes>
    </Router>
  )
}

export default App