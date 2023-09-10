import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import ExampleCompletion from './ExampleCompletion.tsx'
import CreateProgram from './CreateProgram.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>woot</h1>
      <CreateProgram />
    </>
  )
}

export default App
