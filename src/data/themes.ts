import { MapTheme } from '../types';

export const mapThemes: MapTheme[] = [
  {
    id: 'hakataeki',
    name: '博多駅',
    description: '博多駅',
    center: [33.58981221397687, 130.42088233754143],
    zoom: 16,
    dataFile: '/data/hakataeki.csv',
    image: 'https://images.pexels.com/photos/2676331/pexels-photo-2676331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'kurume',
    name: '久留米',
    description: '久留米',
    center: [33.3137512,130.5236905],
    zoom: 14,
    dataFile: '/data/kurume.csv',
    image: 'https://images.pexels.com/photos/2676331/pexels-photo-2676331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
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