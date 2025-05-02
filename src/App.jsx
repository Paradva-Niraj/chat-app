import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/input'
import ContactPanel from './components/ContactPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex min-h-screen min-w-screen bg-cover bg-center bg-no-repeat' style={{backgroundImage: "url('../../public/back-grond-4.jpg')" }}>
      <ContactPanel />
      <div className="flex flex-1 items-end">
        <Input />
      </div>
    </div>
    </>
  )
}

export default App
