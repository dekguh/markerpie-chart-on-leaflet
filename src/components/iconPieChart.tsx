import React from 'react'
import ReactDOMServer from 'react-dom/server'

// LEAFLET
import L, { Map } from 'leaflet'

// PIE CHART
import { PieChart } from 'react-minimal-pie-chart'

const iconPieChart = (cluster : {[key: string]: any;}, mapContext : Map) => {
  // SET SIZE PIE CHART BY ZOOM
  const getSizePieChart = () => {
    if(mapContext.getZoom() <= 10) return 20
    else if(mapContext.getZoom() <= 18) return 25
    else return 20
  }

  // SET DATA PIE CHART
  const getDataPieChart = () => {
    // GET CLUSTER CHILD
    const clusterChild : Array<{[key: string]: any;}> = cluster.superclusterRef.getLeaves(cluster.detail.id)

    return [
      {
        title: 'kecelakaan',
        value: clusterChild.filter(item => item.markerData.status === 'KECELAKAAN').length,
        color: '#E38627'
      },
      {
        title: 'macet',
        value: clusterChild.filter(item => item.markerData.status === 'MACET').length,
        color: '#C13C37'
      },
    ]
  }

  return L.divIcon({
    className: 'marker-pie-chart',
    html: ReactDOMServer.renderToString(
      <div style={{
        width: getSizePieChart() * 2,
        height: getSizePieChart() * 2
      }}>
        <PieChart
          data={getDataPieChart()}
          radius={getSizePieChart()}
          center={[getSizePieChart(), getSizePieChart()]}
          viewBoxSize={[getSizePieChart() * 2, getSizePieChart() * 2]}
          lineWidth={40}
        />
      </div>
    )
  })
}

export default iconPieChart