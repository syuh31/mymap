import React from 'react';

interface LegendItem {
  icon: string;
  color: string;
  label: string;
}

interface MapLegendProps {
  items: LegendItem[];
}

const MapLegend: React.FC<MapLegendProps> = ({ items }) => {
  if (items.length === 0) return null;

  return (
    <div className="absolute bottom-5 right-5 bg-white bg-opacity-90 p-3 rounded-lg shadow-md z-[1000] max-w-[240px]">
      <h3 className="text-sm font-semibold mb-2 text-gray-700">Map Legend</h3>
      <div className="space-y-1">
        {items.map((item, index) => {
          const colorClass = `bg-${item.color}-500`;
          const icon = getIconSymbol(item.icon);
          
          return (
            <div key={index} className="flex items-center text-xs text-gray-700">
              <div className={`${colorClass} w-6 h-6 rounded-full flex items-center justify-center text-white mr-2 border border-white`}>
                {icon}
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to get icon symbol
function getIconSymbol(iconType: string): string {
  const iconTypes: Record<string, string> = {
    building: '🏢',
    landmark: '🏛️',
    train: '🚉',
    water: '💧',
    shop: '🛍️',
    food: '🍴',
    park: '🌳',
    hotel: '🏨',
    default: '📍'
  };
  
  return iconTypes[iconType] || iconTypes.default;
}

export default MapLegend;