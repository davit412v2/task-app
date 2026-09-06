import { useState } from 'react'

export default function App() {
  const [counter, setCounter] = useState<number>(0)

  return (
    <div className="p-8 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Gestor de Proyectos</h1>
      <p>Contador actual: {counter}</p>
      
      <button 
        onClick={() => setCounter(counter + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Incrementar
      </button>
    </div>
  )
}