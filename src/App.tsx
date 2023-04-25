import { useState } from 'react'
import './App.css'
import Affixes from './components/affixes'
import PlayerInfo from './components/playerInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        text here
      </p>
     
      <p className="read-the-docs">
        text here
      </p>

      <PlayerInfo/>

      <Affixes/>
    </>
  )
}

export default App
