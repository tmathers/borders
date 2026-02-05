import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

interface CountryMapProps {
  country: string;
  geoJson?: JSON;
}

const CountryMap: React.FC<CountryMapProps> = ({ country, geoJson }) => {
  const style = { color: 'blue', weight: 2, fillColor: 'blue', fillOpacity: 0.2 };


  const styleFn = (feature: any) => {
    return feature?.properties?.NAME === country
      ? { color: 'blue', weight: 2, fillColor: 'blue', fillOpacity: 1 }
      : { color: '#ccc', weight: 0.5, fillColor: '#eee', fillOpacity: 1 }; // neutral style
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature?.properties?.NAME !== country) {
      layer.remove(); // optional: remove other countries entirely
    } else {
      layer.bindPopup(feature.properties.NAME || feature.properties.NAME_LONG || country);
    }
  };

  return (
    <MapContainer center={[20,0]} zoom={2} style={{ height: '600px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {geoJson &&
        <GeoJSON data={geoJson} style={styleFn} onEachFeature={onEachFeature} />
      }
    </MapContainer>
  );
};

export default CountryMap;
