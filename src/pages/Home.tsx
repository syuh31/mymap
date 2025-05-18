import React from 'react';
import { mapThemes } from '../data/themes';
import ThemeCard from '../components/ThemeCard';
import { MapIcon } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
            <MapIcon size={28} className="text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Multi-Theme Maps</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore various regions in Japan with our interactive maps. Each map focuses on a different area or theme with points of interest.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mapThemes.map(theme => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </div>
      
      <footer className="mt-12 bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            Powered by Leaflet and OpenStreetMap. Map data © <a href="https://www.openstreetmap.org/copyright" className="text-blue-500 hover:underline">OpenStreetMap</a> contributors.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;