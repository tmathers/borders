import React, { useEffect, useRef } from 'react';
import type { FeatureCollection } from 'geojson'
import { HEADER_HEIGHT } from './Header';
import maplibregl from 'maplibre-gl';
import { Box } from '@mantine/core';

interface CountryMapProps {
  country: string;
  geoJson?: FeatureCollection;
}


const STYLE_URL = 'https://demotiles.maplibre.org/globe.json'

const HIGHLIGHT_COLOR = 'rgb(28, 126, 214)'

const CountryMap: React.FC<CountryMapProps> = ({ country, geoJson }) => {

  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (mapRef.current) { return } // already initialized

    mapRef.current = new maplibregl.Map({
      container: 'map', // container id
      style: STYLE_URL,
      center: [0, 0], // starting position [lng, lat]
      zoom: 1 // starting zoom
      
    })

    const map = mapRef.current
    
    // Wait until style is fully loaded
    map.on('style.load', () => {
      highlightCountry(mapRef.current!, country)

      const layers = map.getStyle().layers

      layers?.forEach(layer => {
        if (layer.type === 'symbol') {
          map.setLayoutProperty(layer.id, 'visibility', 'none')
        }
      })
    })
    
  }, [geoJson])

  useEffect(() => {

    if (!mapRef.current) { return }
    const map = mapRef.current

    if (map.isStyleLoaded()) {
      highlightCountry(map, country)
    } else {
      map.once('style.load', () => highlightCountry(map, country))
    }

  }, [country])

  function highlightCountry(map: maplibregl.Map, countryName: string) {
    // Remove existing highlighN.tot layer/source if present

    if (map.getLayer('country-outline')) { map.removeLayer('country-outline') }
    if (map.getSource('country-outline')) { map.removeSource('country-outline') }

    if (map.getLayer('country-fill')) { map.removeLayer('country-fill') }
    if (map.getSource('country-fill')) { map.removeSource('country-fill') }


    const countryFeature = geoJson?.features.find(
      (f: any) => f.properties.NAME.toLowerCase() === countryName.toLowerCase()
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

  // Helper: compute bbox if not present
  function getFeatureBounds(feature: any) {
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


  return (

    <Box 
      ref={mapContainer}
      id="map"
      style={{ height: `${window.innerHeight - HEADER_HEIGHT}px`, width: '100%' }} 
          
    />
  );
};

export default CountryMap;
