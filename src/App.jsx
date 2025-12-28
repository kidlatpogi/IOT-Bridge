import './App.css'
import { useState } from 'react'

function App() {

  const [devices, setDevices] = useState([]);

  const addDevice = () => {
    const deviceName = prompt("Enter device name:");
    if (deviceName) {
      setDevices(prev => [...prev, { name: deviceName }]);
      console.log("Device added:", deviceName);
    }
  }

  return (
    <>
      <header><h1>I.O.T Bridge</h1></header>

      <main>
        <button onClick={addDevice}>Add Device</button>
        <ul>
          {devices.map((d, i) => <li key={i}>{d.name}</li>)}
        </ul>
      </main>
    </>
  )
}

export default App
