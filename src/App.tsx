import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UqbarEncryptorApi from '@uqbar/client-encryptor-api'
import './App.css'

// This env also has BASE_URL which should match the process + package name
const { env } = import.meta
const WEBSOCKET_URL = env.DEV ? `ws://localhost:${env.VITE_NODE_PORT || 8080}` : undefined

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Get our node ID, optimally this would come from a JS file that we retrieve
    fetch('/our').then(r => r.text()).then(nodeId => {
      // Connect to the uqbar node via websocket
      new UqbarEncryptorApi({
        uri: WEBSOCKET_URL,
        nodeId,
        processId: import.meta.env.BASE_URL, // this is set in your vite.config.ts
        onOpen: (ev, api) => {
          console.log('Connected to uqbar node')
          // Send a message to the node via websocket
          api.send({ data: 'Hello World' })
        },
      })
    })
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
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
    </>
  )
}

export default App
