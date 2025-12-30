import './App.css'
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';

function App() {

  // Devices State
  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem("devices");
    return saved ? JSON.parse(saved) : [];
  });

  // Add Device UseEffect
  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
    console.log("Current devices:", devices);
  }, [devices]);

  // Add Device
  const addDevice = () => {
    const deviceName = prompt("Enter device name:");
    
    if (deviceName) {
      setDevices(prev => [...prev, { name: deviceName }]);
      console.log("Device added:", deviceName);
    }
  }

  // Remove Device
  const removeDevice = (index) => {
    const deviceName = devices[index].name;
    const confirmed = window.confirm(`Are you sure you want to remove "${deviceName}"?`);
    
    if (confirmed) {
      setDevices(prev => prev.filter((_, i) => i !== index));
      console.log("Device removed at index:", index);
    }
  }


  // UI
  return (
    <>
      <header><h1 className='Title'>I.O.T Bridge</h1></header>

      <main>
        <button className='Add-Device' onClick={addDevice}>Add Device</button>
        
        <ul className='Device-List'>
          {devices.map((d, i) => <li key={i}>{d.name} <button className='Remove-Device' onClick={() => removeDevice(i)}>Remove</button></li>)}
        </ul>
        
      </main>
    </>
  )
}

export default App
