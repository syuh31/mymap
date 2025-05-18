import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, LocateIcon } from 'lucide-react';
import { mapThemes } from '../data/themes';
import LeafletMap from '../components/LeafletMap';

const MapPage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  
  const theme = mapThemes.find(t => t.id === themeId);
  
  if (!theme) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-3">
            <LocateIcon size={48} className="inline-block" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Map Not Found</h2>
          <p className="text-gray-600 mb-4">
            The map theme "{themeId}" could not be found.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col pt-16">
      <div className="bg-white shadow-sm p-3 z-10">
        <div className="container mx-auto flex items-center">
          <button
            onClick={() => navigate('/')}
            className="mr-3 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">{theme.name}</h1>
        </div>
      </div>
      
      <div className="flex-1">
        <LeafletMap theme={theme} />
      </div>
    </div>
  );
};

export default MapPage;