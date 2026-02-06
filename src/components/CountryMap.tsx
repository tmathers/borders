import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import type { Feature, Geometry } from 'geojson'

interface CountryMapProps {
  country: string;
  geoJson?: Geometry;
}

const HIGHLIGHT_STYLE = { color: 'blue', weight: 3, fillColor: 'blue', fillOpacity: 1 }
const REGULAR_STYLE = { color: '#ccc', weight: 1, fillColor: '#eee', fillOpacity: 1 }

const BOUNDING_BOX_PADDING = 100

const MAP_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

const CountryMap: React.FC<CountryMapProps> = ({ country, geoJson }) => {

  const styleFn = (feature: any) => {
    return feature?.properties?.NAME === country
      ? HIGHLIGHT_STYLE
      : REGULAR_STYLE
  };

  const onEachFeature = (feature: Feature, layer: any) => {
    if (feature?.properties?.NAME !== country) {
      layer.remove(); // optional: remove other countries entirely
    } else {
      layer.bindPopup(feature.properties.NAME || feature.properties.NAME_LONG || country);
    }
  };

  // Functional component bc useMap needs to be within MapContainer
  function FitToFeature() {
    const map = useMap()
    useEffect(() => {
      if (!geoJson) {
        return
      }

      const feature = geoJson.features.find((f: Feature) => f.properties?.NAME === country)
      const layer = (window as any).L.geoJSON(feature)
      const bounds = layer.getBounds()

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [BOUNDING_BOX_PADDING, BOUNDING_BOX_PADDING] })
      }

    }, [geoJson, map, country]);
    return null
  }


  return (
    <MapContainer zoom={2} style={{ height: '800px', width: '100%' }}>
      <TileLayer url={MAP_URL} />
      {geoJson &&
        <GeoJSON data={geoJson} style={styleFn} onEachFeature={onEachFeature} />
      }
      <FitToFeature />
    </MapContainer>
  );
};

export default CountryMap;
