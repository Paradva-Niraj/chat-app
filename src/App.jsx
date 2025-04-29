import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/input'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='min-h-screen min-w-screen bg-cover bg-center bg-no-repeat' style={{backgroundImage: "url('../../public/back-grond-3.jpg')" }}>
      <Input />
    </div>
    </>
  )
}

export default App
