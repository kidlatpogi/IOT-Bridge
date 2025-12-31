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
    const ipaddress = prompt("Enter device IP address:");
    
    if (deviceName) {
      setDevices(prev => [...prev, { name: deviceName, ip: ipaddress }]);
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

  // Edit Device
  const editDevice = (index) => {
    const newDeviceName = prompt("Enter new device name:");
    
    if (newDeviceName) {
      setDevices(prev => prev.map((d, i) => i === index ? { name: newDeviceName } : d));
      console.log("Device modified at index:", index);
    }
  }


  // UI
  return (
    <>
      <header className='Title'><h1>I.O.T Bridge</h1></header>

      <main>
        <button className='Add-Device' onClick={addDevice}>Add Device</button>

        <div className='Device-List'>
          {devices.map((d, i) => (
            <div key={i}>
              <h2>{d.name}</h2>
              <p>{d.ip}</p>
              <button className='Edit-Device' onClick={() => editDevice(i)}>Edit</button>
              <button className='Remove-Device' onClick={() => removeDevice(i)}>Remove</button>
            </div>
          ))}
        </div>
        
      </main>
    </>
  )
}

export default App
