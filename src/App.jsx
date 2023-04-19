import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p className="text-6xl font-bold text-center text-secondaryBlueColor sm:text-3xl sm:px-6 sm:py-6">
        Ecommerce Legends
      </p>
    </div>
  );
}

export default App
