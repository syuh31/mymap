import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapIcon, Menu, X } from 'lucide-react';
import { mapThemes } from '../data/themes';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center space-x-2">
            <MapIcon className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-800">Multi-Maps</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            {mapThemes.map(theme => (
              <Link 
                key={theme.id}
                to={`/map/${theme.id}`}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === `/map/${theme.id}` ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {theme.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t py-3 px-4 shadow-lg absolute w-full">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {mapThemes.map(theme => (
              <Link 
                key={theme.id}
                to={`/map/${theme.id}`}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === `/map/${theme.id}` ? 'text-blue-600' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {theme.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;