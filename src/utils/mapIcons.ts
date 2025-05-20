import L from 'leaflet';

const iconTypes: Record<string, string> = {
  駐車場: '🅿️',
  飲食店: '🍽️',
  軽食: '🍔',
  デザート: '🍰',
  景色: '🌄',
  お土産: '🎁',
  滝: '🌊',
  休憩: '☕',
  道の駅: '🏪',
  リラックス: '🌅',
  見学: '🏛️',
  アクティビティ: '🎯',
  居酒屋: '🍺',
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
  return iconType;
}