import { MapTheme } from '../types';

export const mapThemes: MapTheme[] = [
  {
    id: 'hita',
    name: '日田',
    description: 'Explore the historical city of Hita with its traditional buildings and scenic spots',
    center: [33.3274, 130.9398],
    zoom: 14,
    dataFile: '/data/hita.csv',
    image: 'https://images.pexels.com/photos/2310713/pexels-photo-2310713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'kyukei_kyushu',
    name: '休憩スポット 九州',
    description: 'A guide to the best road stations (Michi-no-Eki) in Northern Kyushu',
    center: [33.2500, 130.7500],
    zoom: 10,
    dataFile: '/data/kyukei_kyushu.csv',
    image: 'https://images.pexels.com/photos/2676331/pexels-photo-2676331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];