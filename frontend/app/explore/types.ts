export interface Monument {
  id: number;
  name: string;
  image: string;
  desc: string;
  gallery?: string[];
  facts?: string[];
  videoId?: string;
  coords?: number[];
  zoom?: number;
  query?: string;
  architecture?: string;
  history?: string;
  bestTime?: string;
  foodIntel?: { item: string; price: string; spot: string }[];
  feedback?: string;
}

export interface Booking {
  id: string;
  name: string;
  image: string;
  date: string;
  time: string;
  status: string;
  type: string;
  location: string;
  qr: string;
}
