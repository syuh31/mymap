import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Location, MapTheme } from '../types';
import { loadLocationData } from '../utils/csvParser';
import { createCustomIcon } from '../utils/mapIcons';
import LayerControl from './LayerControl';
import { MapPin, Locate } from 'lucide-react';

interface LeafletMapProps {
  theme: MapTheme;
}

const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

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
      <Popup className="text-xs md:text-sm">
        <div>
          <h3 className="font-semibold text-sm md:text-base mb-1">現在地</h3>
          <p>緯度: {position[0].toFixed(4)}</p>
          <p>経度: {position[1].toFixed(4)}</p>
        </div>
      </Popup>
    </Marker>
  );
};

const LeafletMap: React.FC<LeafletMapProps> = ({ theme }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<Set<string>>(new Set());
  const [availableLayers, setAvailableLayers] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadLocationData(theme.dataFile);
        setLocations(data);
        
        const layers = new Set(data.map(location => location.icon));
        setAvailableLayers(layers);
        setVisibleLayers(layers);
        
        setError(null);
      } catch (err) {
        console.error('Error loading location data:', err);
        setError('地図データの読み込みに失敗しました。後でもう一度お試しください。');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [theme.dataFile]);
  
  const handleToggleLayer = (layer: string) => {
    setVisibleLayers(prev => {
      const newLayers = new Set(prev);
      if (newLayers.has(layer)) {
        newLayers.delete(layer);
      } else {
        newLayers.add(layer);
      }
      return newLayers;
    });
  };

  const LocationButton = () => {
    const map = useMap();
    
    const handleClick = () => {
      map.locate({ setView: true, maxZoom: 16 });
    };
    
    return (
      <button
        onClick={handleClick}
        className="absolute left-2 bottom-2 md:left-5 md:bottom-5 bg-white p-2 rounded-lg shadow-md z-[1000] hover:bg-gray-50 transition-colors"
        title="現在地を表示"
      >
        <Locate className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
      </button>
    );
  };
  
  if (loading) {
    return (
      <div className="h-[calc(100vh-112px)] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xs md:text-sm text-gray-600">地図データを読み込み中...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-[calc(100vh-112px)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg mx-4">
          <p className="text-xs md:text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-3 py-1.5 md:px-4 md:py-2 bg-blue-500 text-white text-xs md:text-sm rounded hover:bg-blue-600 transition-colors"
          >
            再試行
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
        <LocationButton />
        
        {locations
          .filter(location => visibleLayers.has(location.icon))
          .map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location.icon, location.color)}
            >
              <Popup>
                <div className="text-xs md:text-sm">
                  <h3 className="font-semibold text-sm md:text-base mb-1">{location.name}</h3>
                  <p className="mb-2">{location.comment}</p>
                  {location.url && (
                    <a 
                      href={location.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MapPin size={14} className="mr-1" />
                      Google マップで見る
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      
      <LayerControl 
        layers={availableLayers}
        visibleLayers={visibleLayers}
        onToggleLayer={handleToggleLayer}
      />
    </div>
  );
};

export default LeafletMap;