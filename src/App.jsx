import './App.css'
import { useEffect, useState } from 'react'

function App() {

  // Devices State
  const [devices, setDevices] = useState(() => {
    const saved = localStorage.getItem("devices");
    return saved ? JSON.parse(saved) : [];
  });

  // Device Control State (on/off)
  const [deviceControls, setDeviceControls] = useState({});

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [removingIndex, setRemovingIndex] = useState(null);

  // Form States
  const [formData, setFormData] = useState({
    deviceType: "1",
    name: "",
    ip: ""
  });

  const [editChoice, setEditChoice] = useState("1");

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

  // Add Device Modal Handlers
  const openAddModal = () => {
    setFormData({ deviceType: "1", name: "", ip: "" });
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormData({ deviceType: "1", name: "", ip: "" });
  };

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ip) {
      alert("All fields are required.");
      return;
    }

    if (!isValidIP(formData.ip)) {
      alert("Invalid IP address format. Please enter a valid IPv4 address (e.g., 192.168.1.1)");
      return;
    }

    setDevices(prev => [...prev, { name: formData.name, ip: formData.ip }]);
    console.log("Device added:", formData.name);
    closeAddModal();
  };

  // Edit Device Modal Handlers
  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditChoice("1");
    setFormData({ deviceType: "1", name: devices[index].name, ip: devices[index].ip });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingIndex(null);
    setEditChoice("1");
    setFormData({ deviceType: "1", name: "", ip: "" });
  };

  const handleEditDevice = (e) => {
    e.preventDefault();
    
    if (editChoice === "1") {
      if (!formData.name.trim()) {
        alert("Device name cannot be empty.");
        return;
      }
      setDevices(prev => prev.map((d, i) => i === editingIndex ? { ...d, name: formData.name } : d));
      console.log("Device name modified at index:", editingIndex);
    } else if (editChoice === "2") {
      if (!formData.ip.trim()) {
        alert("IP address cannot be empty.");
        return;
      }
      if (!isValidIP(formData.ip)) {
        alert("Invalid IP address format. Please enter a valid IPv4 address (e.g., 192.168.1.1)");
        return;
      }
      setDevices(prev => prev.map((d, i) => i === editingIndex ? { ...d, ip: formData.ip } : d));
      console.log("Device IP modified at index:", editingIndex);
    }
    closeEditModal();
  };

  // Remove Device Modal Handlers
  const openRemoveModal = (index) => {
    setRemovingIndex(index);
    setShowRemoveModal(true);
  };

  const closeRemoveModal = () => {
    setShowRemoveModal(false);
    setRemovingIndex(null);
  };

  const handleRemoveDevice = () => {
    setDevices(prev => prev.filter((_, i) => i !== removingIndex));
    console.log("Device removed at index:", removingIndex);
    closeRemoveModal();
  };

  const buttonControl = (index) => {
    setDeviceControls(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };;

  // UI
  return (
    <>
      <header className='Title'><h1>IOT Bridge</h1></header>

      <main>
        <button className='Add-Device' onClick={openAddModal}>Add Device</button>

        <div className='Device-List'>
          {devices.map((d, i) => (
            <div key={i} className='Device-Item'>
              <div className='Device-Info'>
                <h2>{d.name}</h2>
                <p>{d.ip}</p>
                <div className='Device-Buttons'>
                  <button className='Edit-Device' onClick={() => openEditModal(i)}>Edit</button>
                  <button className='Remove-Device' onClick={() => openRemoveModal(i)}>Remove</button>
                </div>
              </div>
              <button className='Device-Control' onClick={() => buttonControl(i)}>
                <svg width="80" height="80" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512.3 959C265.3 959 65 758.8 65 511.8S265.3 64.5 512.3 64.5s447.2 200.2 447.2 447.2S759.3 959 512.3 959z" fill="none" stroke="white" strokeWidth="30" />
                  <path d="M512.3 903.1c216.1 0 391.3-175.2 391.3-391.3S728.4 120.4 512.3 120.4 120.9 295.6 120.9 511.8s175.2 391.3 391.4 391.3z" fill={deviceControls[i] ? "#ff4d4d" : "#a0a0a0"} />
                  <path d="M664.9 330.1c12.8-13.3 44.2 13.3 44.2 13.3 34.3 44.2 54.8 100.3 54.8 161.2 0 142.9-112.6 258.7-251.6 258.7S260.7 647.5 260.7 504.6c0-61.9 21.1-118.7 56.3-163.2 0 0 27.5-24.4 41.5-11.4s10.4 35.9 2.3 46.1c-28.5 36-44.3 80.9-44.3 128.5 0 112.3 88 202.8 195.7 202.8S707.9 617 707.9 504.6c0-46.9-15.4-91.2-43.1-127-7.9-10.2-12.8-34.2 0.1-47.5z" fill="#FFFFFF" />
                  <path d="M484.3 288.1c0-15.4 12.4-27.9 28-27.9 15.4 0 28 12.5 28 27.9v195.8c0 15.4-12.4 27.9-28 27.9-15.4 0-28-12.5-28-27.9V288.1z" fill="#FFFFFF" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Add Device Modal */}
        {showAddModal && (
          <div className='Modal-Overlay' onClick={closeAddModal}>
            <div className='Modal' onClick={(e) => e.stopPropagation()}>
              <div className='Modal-Header'>
                <h2>Add Device</h2>
                <button className='Modal-Close' onClick={closeAddModal}>×</button>
              </div>
              <form onSubmit={handleAddDevice}>
                <div className='Form-Group'>
                  <label>Device Type</label>
                  <select 
                    value={formData.deviceType}
                    onChange={(e) => setFormData({...formData, deviceType: e.target.value})}
                  >
                    <option value="1">Bulb</option>
                    <option value="2">Switch</option>
                    <option value="3">Sensor</option>
                  </select>
                </div>
                <div className='Form-Group'>
                  <label>Device Name</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter device name"
                    required
                  />
                </div>
                <div className='Form-Group'>
                  <label>IP Address</label>
                  <input 
                    type="text"
                    value={formData.ip}
                    onChange={(e) => setFormData({...formData, ip: e.target.value})}
                    placeholder="e.g., 192.168.1.1"
                    required
                  />
                </div>
                <div className='Modal-Actions'>
                  <button type="button" className='Modal-Cancel' onClick={closeAddModal}>Cancel</button>
                  <button type="submit" className='Modal-Submit'>Add Device</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Device Modal */}
        {showEditModal && (
          <div className='Modal-Overlay' onClick={closeEditModal}>
            <div className='Modal' onClick={(e) => e.stopPropagation()}>
              <div className='Modal-Header'>
                <h2>Edit Device</h2>
                <button className='Modal-Close' onClick={closeEditModal}>×</button>
              </div>
              <form onSubmit={handleEditDevice}>
                {editingIndex !== null && (
                  <div className='Edit-Device-Info'>
                    <p><strong>Device:</strong> {devices[editingIndex]?.name}</p>
                    <p><strong>IP:</strong> {devices[editingIndex]?.ip}</p>
                  </div>
                )}
                <div className='Form-Group'>
                  <label>What would you like to edit?</label>
                  <select 
                    value={editChoice}
                    onChange={(e) => setEditChoice(e.target.value)}
                  >
                    <option value="1">Edit Device Name</option>
                    <option value="2">Edit I.P. Address</option>
                  </select>
                </div>
                {editChoice === "1" && (
                  <div className='Form-Group'>
                    <label>New Device Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter new device name"
                      required
                    />
                  </div>
                )}
                {editChoice === "2" && (
                  <div className='Form-Group'>
                    <label>New I.P. Address</label>
                    <input 
                      type="text"
                      value={formData.ip}
                      onChange={(e) => setFormData({...formData, ip: e.target.value})}
                      placeholder="e.g., 192.168.1.1"
                      required
                    />
                  </div>
                )}
                <div className='Modal-Actions'>
                  <button type="button" className='Modal-Cancel' onClick={closeEditModal}>Cancel</button>
                  <button type="submit" className='Modal-Submit'>Update</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Remove Device Modal */}
        {showRemoveModal && (
          <div className='Modal-Overlay' onClick={closeRemoveModal}>
            <div className='Modal Modal-Danger' onClick={(e) => e.stopPropagation()}>
              <div className='Modal-Header'>
                <h2>Remove Device</h2>
                <button className='Modal-Close' onClick={closeRemoveModal}>×</button>
              </div>
              <div className='Modal-Body'>
                <p>Are you sure you want to remove "{removingIndex !== null && devices[removingIndex]?.name}"?</p>
                <p className='Warning-Text'>This action cannot be undone.</p>
              </div>
              <div className='Modal-Actions'>
                <button type="button" className='Modal-Cancel' onClick={closeRemoveModal}>Cancel</button>
                <button type="button" className='Modal-Delete' onClick={handleRemoveDevice}>Remove</button>
              </div>
            </div>
          </div>
        )}
        
      </main>
    </>
  )
}

export default App
