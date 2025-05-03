import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/input'
import ContactPanel from './components/ContactPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>
      <ContactPanel />
      <Input />
    </div>
  )
}

export default App
