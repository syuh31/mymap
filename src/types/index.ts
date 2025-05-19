export interface Location {
  name: string;
  lat: number;
  lng: number;
  icon: string;
  color: string;
  url: string;
  comment: string;
}

export interface MapTheme {
  id: string;
  name: string;
  description: string;
  center: [number, number];
  zoom: number;
  dataFile: string;
  image: string;
}