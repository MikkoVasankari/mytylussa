import { useState } from 'react'
import './App.css'
import Affixes from './components/affixes'

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
        text here !
      </p>
     
      <p className="read-the-docs">
        text here
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="name">Player Realm</label>
        <input type="text" id="Realm" />
        <br></br>
        <label htmlFor="name">Player Name</label>
        <input type="text" id="name" />
        <br></br>
        <br></br>
        <button >Submit</button>
      </form>

      <Affixes/>
    </>
  )
}

export default App
