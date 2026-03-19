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
  qr?: string;
  architecture?: string;
  history?: string;
  bestTime?: string;
  foodIntel?: { item: string; price: string; spot: string }[];
  feedback?: string;
  verified?: string;
  hotels?: { name: string; price: string; rating: string; img: string; desc: string }[];
}

export interface BookingDetails {
  date: string;
  time: string;
  days: number;
  type: string;
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
