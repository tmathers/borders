import { FeatureCollection } from "geojson"

export const HIGHLIGHT_COLOR = 'rgb(28, 126, 214)'

// compute bounding box
export function getFeatureBounds(feature: any) {
  const coords: [number, number][] = []

  const extractCoords = (geom: any) => {
    if (geom.type === 'Polygon') {
      geom.coordinates.forEach((ring: any) => ring.forEach((c: any) => coords.push(c)))
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach((poly: any) =>
        poly.forEach((ring: any) => ring.forEach((c: any) => coords.push(c)))
      )
    }
  }

  extractCoords(feature.geometry)
  const lons = coords.map(c => c[0])
  const lats = coords.map(c => c[1])
  return [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]
}


export function highlightCountry(
  geoJson: FeatureCollection | undefined,
  map: maplibregl.Map,
  countryName: string,
) {
  // Remove existing highlighN.tot layer/source if present

  if (map.getLayer('country-outline')) { map.removeLayer('country-outline') }
  if (map.getSource('country-outline')) { map.removeSource('country-outline') }

  if (map.getLayer('country-fill')) { map.removeLayer('country-fill') }
  if (map.getSource('country-fill')) { map.removeSource('country-fill') }


  const countryFeature = geoJson?.features.find(
    (f: any) => f.properties.NAME_LONG.toLowerCase() === countryName.toLowerCase()
  )

  if (!countryFeature) {
    // eslint-disable-next-line no-console
    console.warn(`Country "${countryName}" not found`)
    return
  }

  map.addSource('country-outline', {
    type: 'geojson',
    data: countryFeature
  })

  map.addLayer({
    id: 'country-outline',
    type: 'line',
    source: 'country-outline',
    paint: {
      'line-color': HIGHLIGHT_COLOR,
      'line-width': 5,

    }
  })

  map.addSource('country-fill', {
    type: 'geojson',
    data: countryFeature
  })

  map.addLayer({
    id: 'country-fill',
    type: 'fill',
    source: 'country-fill',
    paint: {
      'fill-color': HIGHLIGHT_COLOR,
      'fill-opacity': 0.5,
    }
  })

  const [minLng, minLat, maxLng, maxLat] = countryFeature.bbox
    ? countryFeature.bbox
    : getFeatureBounds(countryFeature)

  map.fitBounds(
    [
      [minLng, minLat],
      [maxLng, maxLat]
    ],
    { padding: 40 }
  )
}