import React, { useState } from 'react'

// STYLES
import './App.css'
import 'leaflet/dist/leaflet.css'

// LEAFLET
import { MapContainer, TileLayer } from 'react-leaflet'

// COMPONENTS
import ClusterWithSuperCluster from './components/ClusterWithSuperCluster'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(current => current + 1)}>CLICK me {count}</button>

      <MapContainer
        style={{ width: '100%', height: '100vh' }}
        zoom={10}
        center={[-8.793537, 115.215591]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClusterWithSuperCluster />
      </MapContainer>
    </>
  )
}

export default App
