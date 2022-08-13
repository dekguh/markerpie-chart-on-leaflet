import React, { useEffect, useMemo, useState } from 'react'

// LEAFLET
import { useMap } from 'react-leaflet'

// SUPERCLUSTER
import Supercluster from 'supercluster'

// DATA
import dummyData from './dummyData'
import RenderMarkerSuperCluster from './RenderMarkerSuperCluster'

// TYPES
import { TItemDummyData } from './types'

// UTILS
import { updateMapBoundsAndZoom } from './utils'

const ClusterWithSuperCluster : React.FC = () => {
  // CONTEXT
  const mapContext = useMap()
  
  // STATES
  const [dataCluster, setDataCluster] = useState<Supercluster.PointFeature<Supercluster.AnyProps>[]>([])
  const [mapBounds, setMapBounds] = useState<GeoJSON.BBox>([0, 0, 0, 0])
  const [mapZoom, setMapZoom] = useState<number>(0)
  const [superclusterRef, setSuperclusterRef] = useState<{[key: string]: any;} | undefined>()

  // MEMOIZE
  const memoizeDataCluster = useMemo(() => {
    return dataCluster
  }, [dataCluster])
  const memoizeSuperclusterRef = useMemo(() => {
    return superclusterRef
  }, [superclusterRef])

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
    const initSupercluster = new Supercluster({ radius: 40, maxZoom: 16 })
    initSupercluster.load(pointList)
  
    // GET CLUSTER AND SET TO STATE
    const getClusters = initSupercluster.getClusters(mapBounds, mapZoom)

    setSuperclusterRef(initSupercluster)
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
      <RenderMarkerSuperCluster dataCluster={memoizeDataCluster} superclusterRef={memoizeSuperclusterRef}/>
    </>
  )
}
  
export default ClusterWithSuperCluster