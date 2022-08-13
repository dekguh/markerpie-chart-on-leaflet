import React from 'react'

// LEAFLET
import L from 'leaflet'
import { Marker, useMap } from 'react-leaflet'

// ICON CUSTOM
import iconPieChart from './iconPieChart'

// TYPES
import { IRenderMarkerSuperCluster } from './types'

const RenderMarkerSuperCluster : React.FC<IRenderMarkerSuperCluster> = ({ superclusterRef, dataCluster }) => {
  const mapContext = useMap()
  console.log('it rerender')

  return (
    <>
      {dataCluster && dataCluster.map((item, index) => {
        if(item.properties.cluster) {
          return(
            <Marker
              key={index}
              position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
              icon={iconPieChart({ superclusterRef, detail: item }, mapContext)}
            />
          )
        } else {
          return(
            <Marker
              key={index}
              position={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}
              icon={L.icon({
                iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
                iconSize: [38, 40],
              })}
            />
          )
        }
      })}
    </>
  )
}

export default React.memo(RenderMarkerSuperCluster)