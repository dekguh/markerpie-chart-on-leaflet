import { LatLngBounds, Map } from 'leaflet'

export const updateMapBoundsAndZoom = (
  inputMap : Map,
  inputSetBounds : React.Dispatch<React.SetStateAction<GeoJSON.BBox>>,
  inputSetZoom : React.Dispatch<React.SetStateAction<number>>
) => {
  if (inputMap) {
    const b : LatLngBounds = inputMap.getBounds()
  
    inputSetBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ])
  
    inputSetZoom(inputMap.getZoom())
  }
}
  