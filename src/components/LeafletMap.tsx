import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Location, MapTheme } from '../types';
import { loadLocationData } from '../utils/csvParser';
import { createCustomIcon, getMapLegend } from '../utils/mapIcons';
import MapLegend from './MapLegend';
import { Navigation2 } from 'lucide-react';

interface LeafletMapProps {
  theme: MapTheme;
}

// Map recenter component to handle center changes
const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

// Location tracking component
const LocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  useEffect(() => {
    map.locate();
  }, [map]);

  return position === null ? null : (
    <Marker 
      position={position}
      icon={createCustomIcon('navigation', 'blue')}
    >
      <Popup>
        <div className="text-sm">
          <h3 className="font-semibold text-base mb-1">Your Location</h3>
          <p>Lat: {position[0].toFixed(4)}</p>
          <p>Lng: {position[1].toFixed(4)}</p>
        </div>
      </Popup>
    </Marker>
  );
};

const LeafletMap: React.FC<LeafletMapProps> = ({ theme }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadLocationData(theme.dataFile);
        setLocations(data);
        setError(null);
      } catch (err) {
        console.error('Error loading location data:', err);
        setError('Failed to load map data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [theme.dataFile]);
  
  const legendItems = getMapLegend(locations);
  
  if (loading) {
    return (
      <div className="h-[calc(100vh-112px)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-[calc(100vh-112px)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-112px)] relative">
      <MapContainer 
        center={theme.center} 
        zoom={theme.zoom} 
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapRecenter center={theme.center} />
        <LocationMarker />
        
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(location.icon, location.color)}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-semibold text-base mb-1">{location.name}</h3>
                <p>{location.comment}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <MapLegend items={legendItems} />
    </div>
  );
};

export default LeafletMap;