import './App.css'
import { useEffect, useState } from 'react'

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

  // Validate IP Address
  const isValidIP = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  }

  // Add Device
  const addDevice = () => {
    const deviceName = prompt("Enter device name:");
    const ipaddress = prompt("Enter device IP address:");
    
    if (deviceName && ipaddress) {
      if (!isValidIP(ipaddress)) {
        alert("Invalid IP address format. Please enter a valid IPv4 address (e.g., 192.168.1.1)");
        return;
      }
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

  // Edit Device (Name or IP)
  const editDeviceInfo = (index) => {
    const choice = prompt("What would you like to edit?\n1. Name\n2. IP Address\n\nEnter 1 or 2:");
    
    if (choice === "1") {
      const newDeviceName = prompt("Enter new device name:");
      if (newDeviceName) {
        setDevices(prev => prev.map((d, i) => i === index ? { ...d, name: newDeviceName } : d));
        console.log("Device name modified at index:", index);
      }
    } else if (choice === "2") {
      const newDeviceIp = prompt("Enter new device IP address:");
      if (newDeviceIp) {
        if (!isValidIP(newDeviceIp)) {
          alert("Invalid IP address format. Please enter a valid IPv4 address (e.g., 192.168.1.1)");
          return;
        }
        setDevices(prev => prev.map((d, i) => i === index ? { ...d, ip: newDeviceIp } : d));
        console.log("Device IP modified at index:", index);
      }
    }
  }

  // UI
  return (
    <>
      <header className='Title'><h1>IOT Bridge</h1></header>

      <main>
        <button className='Add-Device' onClick={addDevice}>Add Device</button>

        <div className='Device-List'>
          {devices.map((d, i) => (
            <div key={i} className='Device-Item'>
              <div className='Device-Info'>
                <h2>{d.name}</h2>
                <p>{d.ip}</p>
                <div className='Device-Buttons'>
                  <button className='Edit-Device' onClick={() => editDeviceInfo(i)}>Edit</button>
                  <button className='Remove-Device' onClick={() => removeDevice(i)}>Remove</button>
                </div>
              </div>
              <button className='Device-Control'>
                <svg width="80" height="80" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512.3 959C265.3 959 65 758.8 65 511.8S265.3 64.5 512.3 64.5s447.2 200.2 447.2 447.2S759.3 959 512.3 959z" fill="none" stroke="white" strokeWidth="30" />
                  <path d="M512.3 903.1c216.1 0 391.3-175.2 391.3-391.3S728.4 120.4 512.3 120.4 120.9 295.6 120.9 511.8s175.2 391.3 391.4 391.3z" fill="#ff4d4d" />
                  <path d="M664.9 330.1c12.8-13.3 44.2 13.3 44.2 13.3 34.3 44.2 54.8 100.3 54.8 161.2 0 142.9-112.6 258.7-251.6 258.7S260.7 647.5 260.7 504.6c0-61.9 21.1-118.7 56.3-163.2 0 0 27.5-24.4 41.5-11.4s10.4 35.9 2.3 46.1c-28.5 36-44.3 80.9-44.3 128.5 0 112.3 88 202.8 195.7 202.8S707.9 617 707.9 504.6c0-46.9-15.4-91.2-43.1-127-7.9-10.2-12.8-34.2 0.1-47.5z" fill="#FFFFFF" />
                  <path d="M484.3 288.1c0-15.4 12.4-27.9 28-27.9 15.4 0 28 12.5 28 27.9v195.8c0 15.4-12.4 27.9-28 27.9-15.4 0-28-12.5-28-27.9V288.1z" fill="#FFFFFF" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
      </main>
    </>
  )
}

export default App
