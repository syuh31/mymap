import L from 'leaflet';

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

const colorClasses: Record<string, string> = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  default: 'bg-gray-500'
};

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

export function getIconSymbol(iconType: string): string {
  return iconTypes[iconType] || iconTypes.default;
}

export function getIconLabel(iconType: string): string {
  const labels: Record<string, string> = {
    building: '建物',
    landmark: '観光地',
    train: '駅',
    water: '水辺',
    shop: 'ショッピング',
    food: '飲食店',
    park: '公園',
    hotel: 'ホテル',
    navigation: '現在地',
    default: '地点'
  };
  
  return labels[iconType] || labels.default;
}