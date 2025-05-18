import L from 'leaflet';

// Define icon types and their corresponding emoji or symbol
const iconTypes: Record<string, string> = {
  building: '🏢',
  landmark: '🏛️',
  train: '🚉',
  water: '💧',
  shop: '🛍️',
  food: '🍴',
  park: '🌳',
  hotel: '🏨',
  navigation: '📍',
  default: '📍'
};

// Define color classes for icon backgrounds
const colorClasses: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  default: 'bg-gray-500'
};

/**
 * Creates a Leaflet div icon with custom styling based on type and color
 */
export function createCustomIcon(iconType: string, color: string): L.DivIcon {
  const icon = iconTypes[iconType] || iconTypes.default;
  const colorClass = colorClasses[color] || colorClasses.default;
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-icon ${colorClass} rounded-full flex items-center justify-center text-white w-8 h-8 border-2 border-white shadow-md">${icon}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

/**
 * Returns the legend items for the current map theme
 */
export function getMapLegend(locations: { icon: string; color: string }[]): { icon: string; color: string; label: string }[] {
  // Get unique icon-color combinations
  const uniquePairs = new Set<string>();
  const legendItems: { icon: string; color: string; label: string }[] = [];
  
  locations.forEach(location => {
    const key = `${location.icon}-${location.color}`;
    if (!uniquePairs.has(key)) {
      uniquePairs.add(key);
      legendItems.push({
        icon: location.icon,
        color: location.color,
        label: getIconLabel(location.icon)
      });
    }
  });
  
  return legendItems;
}

/**
 * Returns a readable label for each icon type
 */
function getIconLabel(iconType: string): string {
  const labels: Record<string, string> = {
    building: 'Building',
    landmark: 'Landmark',
    train: 'Station',
    water: 'Water Feature',
    shop: 'Shopping',
    food: 'Restaurant',
    park: 'Park',
    hotel: 'Hotel',
    navigation: 'Your Location',
    default: 'Location'
  };
  
  return labels[iconType] || labels.default;
}