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
  navigation: '▲',
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
  
  // 現在地アイコンの特別な処理
  if (iconType === 'navigation') {
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-icon flex items-center justify-center w-8 h-8">
        <div class="relative w-4 h-4">
          <div class="absolute inset-0 bg-blue-500 rounded-full"></div>
          <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div>
          <div class="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-75"></div>
          <div class="absolute inset-0 flex items-center justify-center text-white transform -rotate-45">${icon}</div>
        </div>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  }
  
  // 通常のアイコン
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="marker-icon relative group">
      <div class="absolute -top-8 left-1/2 -translate-x-1/2 ${colorClass} w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transform-gpu transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:shadow-xl">
        ${icon}
      </div>
      <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-6 ${colorClass}"></div>
      <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 ${colorClass} rounded-full"></div>
    </div>`,
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