import React from 'react';
import { Link } from 'react-router-dom';
import { MapTheme } from '../types';
import { MapIcon } from 'lucide-react';

interface ThemeCardProps {
  theme: MapTheme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  return (
    <Link 
      to={`/map/${theme.id}`}
      className="block overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] bg-white h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={theme.image} 
          alt={theme.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h3 className="text-white font-bold text-xl p-4">{theme.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-3">{theme.description}</p>
        <div className="flex items-center text-sm text-blue-600 font-medium">
          <MapIcon size={16} className="mr-1" />
          <span>Explore Map</span>
        </div>
      </div>
    </Link>
  );
};

export default ThemeCard;