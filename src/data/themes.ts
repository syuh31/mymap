import { MapTheme } from '../types';

export const mapThemes: MapTheme[] = [
  {
    id: 'hita',
    name: 'Hita Area',
    description: 'Explore the historical city of Hita with its traditional buildings and scenic spots',
    center: [33.3274, 130.9398],
    zoom: 14,
    dataFile: '/data/hita.csv',
    image: 'https://images.pexels.com/photos/2310713/pexels-photo-2310713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'kurume',
    name: 'Kurume Area',
    description: 'Discover the vibrant city of Kurume, known for its cultural heritage and modern attractions',
    center: [33.3192, 130.5125],
    zoom: 13,
    dataFile: '/data/kurume.csv',
    image: 'https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 'michinoeki',
    name: 'Kyushu Road Stations',
    description: 'A guide to the best road stations (Michi-no-Eki) in Northern Kyushu',
    center: [33.2500, 130.7500],
    zoom: 10,
    dataFile: '/data/michinoeki.csv',
    image: 'https://images.pexels.com/photos/2676331/pexels-photo-2676331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];