import React, { useEffect, useRef, useState } from 'react'

// LEAFLET
import L from 'leaflet'
import { Marker, useMap } from 'react-leaflet'

// SUPERCLUSTER
import Supercluster from 'supercluster'

// DATA
import dummyData from './dummyData'

// TYPES
import { TItemDummyData } from './types'

// UTILS
import { updateMapBoundsAndZoom } from './utils'

// ICON CUSTOM
import iconPieChart from './iconPieChart'

const ClusterWithSuperCluster : React.FC = () => {
  // REFS
  const superclusterRef = useRef<Supercluster | undefined>()
  
  // CONTEXT
  const mapContext = useMap()
  
  // STATES
  const [dataCluster, setDataCluster] = useState<Supercluster.PointFeature<Supercluster.AnyProps>[]>([])
  const [mapBounds, setMapBounds] = useState<GeoJSON.BBox>([0, 0, 0, 0])
  const [mapZoom, setMapZoom] = useState<number>(0)

  // GENERATE CLUSTER
  const updateCluster = () => {
    // JOIN DATA TO GEOJSON
    const pointList : Supercluster.PointFeature<Supercluster.AnyProps>[] = dummyData.map((item : TItemDummyData) => ({
      type: 'Feature',
      properties: {
        cluster: false
      },
      geometry: {
        type: 'Point',
        coordinates: [item.long, item.lat]
      },
      markerData: item
    }))
  
    // CREATE CLUSTER
    superclusterRef.current = new Supercluster({ radius: 40, maxZoom: 16 })
    superclusterRef.current.load(pointList)
  
    // GET CLUSTER AND SET TO STATE
    const getClusters = superclusterRef.current.getClusters(mapBounds, mapZoom)
    setDataCluster(getClusters)
  }
  
  // SIDE EFFECT SET BOUNDS AND ZOOM
  useEffect(() => {
    if(mapContext) {
      if(!mapZoom) {
        updateMapBoundsAndZoom(mapContext, setMapBounds, setMapZoom)
      }

      mapContext.on('zoom drag', () => {
        updateMapBoundsAndZoom(mapContext, setMapBounds, setMapZoom)
      })
    }
  }, [mapContext])
  
  // SIDE EFFECT CLUSTER
  useEffect(() => {
    if (mapBounds && mapZoom) updateCluster()
  }, [mapBounds, mapZoom])
  
  return(
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
  
export default ClusterWithSuperCluster