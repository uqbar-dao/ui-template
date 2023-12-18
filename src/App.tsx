import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/assets/vite.svg'
import UqbarEncryptorApi from '@uqbar/client-encryptor-api'
import './App.css'

if (window.our) window.our.process = import.meta.env.BASE_URL?.slice(1)

// This env also has BASE_URL which should match the process + package name
const WEBSOCKET_URL = import.meta.env.DEV ? `ws://localhost:${import.meta.env.VITE_NODE_PORT || 8080}` : undefined

function App() {
  const [count, setCount] = useState(0)
  const [nodeConnected, setNodeConnected] = useState(true)

  useEffect(() => {
    // Connect to the uqbar node via websocket
    if (window.our?.node) {
      new UqbarEncryptorApi({
        uri: WEBSOCKET_URL,
        nodeId: window.our.node,
        processId: import.meta.env.BASE_URL, // this is set in your vite.config.ts
        onOpen: (_event, api) => {
          console.log('Connected to uqbar node')
          // Send a message to the node via websocket
          api.send({ data: 'Hello World' })
        },
      })
    } else {
      setNodeConnected(false)
    }
  }, [])

  return (
    <>
      {!nodeConnected &&
        <div className="node-not-connected">
          <h2 style={{ color: 'red' }}>Node not connected</h2>
          <h4>
            You need to start a node at http://localhost:{import.meta.env.VITE_NODE_PORT || 8080} before you can use this UI in development.
          </h4>
        </div>
      }
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>on Uqbar</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test Hot Module Reloading (HMR)
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
