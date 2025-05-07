import { useEffect, useState } from 'react'
import './App.css'
import { GlobalState } from './State/GlobalState'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)
  const appState = GlobalState.getInstance();

  useEffect(() => {

    console.log("APP STATE ::: ", appState);
  },[])

  return (
    <>
     
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>



      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <AppRoutes />;
    </>
  )
}

export default App
