import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { getIconLabel } from '../utils/mapIcons';

interface LayerControlProps {
  layers: Set<string>;
  visibleLayers: Set<string>;
  onToggleLayer: (layer: string) => void;
}

const LayerControl: React.FC<LayerControlProps> = ({ layers, visibleLayers, onToggleLayer }) => {
  return (
    <div className="absolute top-5 right-5 bg-white bg-opacity-90 p-3 rounded-lg shadow-md z-[1000]">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">Layer Controls</h3>
      <div className="space-y-2">
        {Array.from(layers).map((layer) => (
          <button
            key={layer}
            onClick={() => onToggleLayer(layer)}
            className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span>{getIconLabel(layer)}</span>
            {visibleLayers.has(layer) ? (
              <Eye className="w-4 h-4 text-blue-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;