import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { getIconLabel, getIconSymbol } from '../utils/mapIcons';

interface LayerControlProps {
  layers: Set<string>;
  visibleLayers: Set<string>;
  onToggleLayer: (layer: string) => void;
}

const LayerControl: React.FC<LayerControlProps> = ({ layers, visibleLayers, onToggleLayer }) => {
  const handleLayerClick = (layer: string) => {
    if (visibleLayers.size === layers.size) {
      // If all layers are visible, show only the clicked layer
      onToggleLayer(`single:${layer}`);
    } else {
      // Otherwise, toggle the layer normally
      onToggleLayer(layer);
    }
  };

  return (
    <div className="absolute top-2 right-2 md:top-5 md:right-5 bg-white bg-opacity-90 p-2 md:p-3 rounded-lg shadow-md z-[1000] max-w-[180px] md:max-w-[240px]">
      <h3 className="text-xs md:text-sm font-semibold mb-2 text-gray-700">表示設定</h3>
      <div className="space-y-1 md:space-y-2">
        {Array.from(layers).map((layer) => (
          <button
            key={layer}
            onClick={() => handleLayerClick(layer)}
            className="flex items-center justify-between w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <div className="flex items-center">
              <span className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center mr-2">
                {getIconSymbol(layer)}
              </span>
              <span>{getIconLabel(layer)}</span>
            </div>
            {visibleLayers.has(layer) ? (
              <Eye className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
            ) : (
              <EyeOff className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayerControl;