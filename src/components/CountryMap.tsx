import React, { RefObject, useEffect, useRef } from 'react';
import type { FeatureCollection } from 'geojson'
import { HEADER_HEIGHT } from './Header';
import maplibregl from 'maplibre-gl';
import { Box } from '@mantine/core';
import { highlightCountry } from '@/util/map';

interface CountryMapProps {
  country: string;
  geoJson?: FeatureCollection;
  mapRef: RefObject<maplibregl.Map | null>
}


const STYLE_URL = new URL('../data/globe.json', import.meta.url).href


const CountryMap: React.FC<CountryMapProps> = ({ country, geoJson, mapRef }) => {

  const mapContainer = useRef<HTMLDivElement>(null)

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
      highlightCountry(geoJson, mapRef.current!, country)

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
      highlightCountry(geoJson, map, country)
    } else {
      map.once('style.load', () => highlightCountry(geoJson, map, country))
    }

  }, [country])


  return (

    <Box 
      ref={mapContainer}
      id="map"
      style={{ height: `${window.innerHeight - HEADER_HEIGHT}px`, width: '100%' }} 
          
    />
  );
};

export default CountryMap;
