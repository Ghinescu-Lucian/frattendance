import { useEffect, useState } from 'react'
import './App.css'
import { GlobalState } from './State/GlobalState'
import AppRoutes from './routes/AppRoutes'
import { getUserInfo } from './Services/UserService'

function App() {
  const [count, setCount] = useState(0)
  const appState = GlobalState.getInstance();
  const [username, setUsername] = useState<String>("");


  const getUsername = async () => {
    const res = await getUserInfo();
    setUsername(res);
  }

  useEffect( () => {
      
  },[])
  

  return (
    <>
     
      <h1>Vite + React</h1>
      <div>Hello, {username}!</div>
      <div className="card">
        <button onClick={async () => {setCount((count) => count + 1); getUsername()}}>
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
