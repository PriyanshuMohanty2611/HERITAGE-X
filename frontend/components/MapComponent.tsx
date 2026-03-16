"use client";

import { MapContainer, TileLayer, Marker, Popup, Tooltip, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Layers, Users, ShieldAlert, Navigation } from 'lucide-react';

const createIcon = (colorUrl: string, size = 32) => new Icon({
  iconUrl: colorUrl,
  iconSize: [size, size],
  iconAnchor: [size / 2, size],
});

type Suggestion = {
  coords?: [number, number];
  icon?: string;
  title: string;
  desc?: string;
  type?: string;
  image?: string;
  health?: number;
  rating?: string;
};

type MapProps = {
  activeLocation?: { coords?: [number, number] };
  suggestions?: Suggestion[];
};

export default function InteractiveMap({ activeLocation, suggestions = [] }: MapProps) {
  const [mapLayer, setMapLayer] = useState("dark_all");
  const defaultPosition: [number, number] = [20.2961, 85.8245]; // Bhubaneswar, Odisha center
  const currentPosition = activeLocation?.coords || defaultPosition;

  useEffect(() => {
    let mounted = true;
    import("leaflet").then((L) => {
      if (!mounted) return;
      L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div className="h-full w-full relative group font-sans">
      <MapContainer 
        key={`${currentPosition[0]}-${currentPosition[1]}`} // Re-render on pos change
        center={currentPosition} 
        zoom={activeLocation ? 14 : 10} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="h-[500px] lg:h-full w-full z-0 font-sans"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">Carto</a>'
          url={`https://{s}.basemaps.cartocdn.com/${mapLayer}/{z}/{x}/{y}{r}.png`}
        />
        <ZoomControl position="bottomright" />
        
        {(suggestions || []).map((poi: Suggestion, i: number) => (
          <Marker 
            key={i} 
            position={poi?.coords || [0,0]} 
            icon={createIcon(poi.icon || 'https://cdn-icons-png.flaticon.com/512/684/684908.png')}
          >
            <Tooltip direction="top" offset={[0, -32]} className="map-tooltip font-bold tracking-widest">{poi.title}</Tooltip>
            {poi.type === "monument" && (
              <Popup className="custom-popup">
                <div className="p-1 flex flex-col gap-2 min-w-[200px] text-black">
                  <div className={`h-28 bg-cover bg-center rounded-lg`} style={{ backgroundImage: `url(${poi.image})`}}></div>
                  <h3 className="font-bold text-lg mt-1">{poi.title}</h3>
                  <p className="text-[10px] uppercase font-bold text-heritage-cyan bg-heritage-surface/50 px-2 py-0.5 rounded-sm w-max">Health: {poi.health}%</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{poi.desc}</p>
                  
                  <div className="flex gap-2 mt-2">
                    <button className="bg-heritage-indigo hover:bg-heritage-cyan text-white text-[10px] uppercase tracking-widest py-2 rounded-md w-full font-bold transition-colors">3D Gallery</button>
                    <button className="bg-[#1e293b] text-white text-[10px] uppercase tracking-widest py-2 rounded-md w-full font-bold">Route</button>
                  </div>
                </div>
              </Popup>
            )}
            {poi.type !== "monument" && (
                <Popup className="custom-popup">
                    <div className="p-1 text-center">
                        <h4 className="font-bold text-white mb-1">{poi.title}</h4>
                        <p className="text-xs text-gray-400">{poi.desc}</p>
                        <p className="text-[10px] text-heritage-gold mt-2 font-mono uppercase">Rating: {poi.rating}</p>
                    </div>
                </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Layers & Time Engine Overlay */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto flex flex-col gap-2">
         <button onClick={() => setMapLayer(prev => prev === "dark_all" ? "rastertiles/voyager" : "dark_all")} className="bg-[#131b2f]/90 hover:bg-heritage-surface text-gray-300 p-3 rounded-xl border border-heritage-surface shadow-2xl transition-all group flex items-center justify-center">
            <Layers className="w-5 h-5 group-hover:text-heritage-cyan" />
         </button>
         <button className="bg-[#131b2f]/90 hover:bg-heritage-surface text-gray-300 p-3 rounded-xl border border-heritage-surface shadow-2xl transition-all group flex items-center justify-center relative">
            <Users className="w-5 h-5 group-hover:text-pink-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
         </button>
         <button className="bg-[#131b2f]/90 hover:bg-heritage-surface text-gray-300 p-3 rounded-xl border border-heritage-surface shadow-2xl transition-all group flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 group-hover:text-red-400" />
         </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-max z-20 pointer-events-auto hidden md:flex items-center gap-4 bg-[#131b2f]/90 backdrop-blur-xl border border-heritage-surface px-6 py-3 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Chronos Engine:</span>
        <div className="flex gap-2">
            {["500 BC", "800 AD", "1300 AD", "1900 AD", "2025"].map(era => (
                <button key={era} className={`text-[10px] px-3 py-1.5 rounded-full font-mono uppercase tracking-widest font-bold transition-all ${era === "2025" ? "bg-heritage-cyan text-[#0B1120]" : "bg-heritage-surface/50 text-gray-400 hover:text-white"}`}>
                    {era}
                </button>
            ))}
        </div>
      </div>
      
      {/* HUD Elements Overlaying the Map */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-[#131b2f]/90 backdrop-blur-md border border-heritage-surface p-3 rounded-xl shadow-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-heritage-indigo/20 flex items-center justify-center border border-heritage-indigo/50">
            <Navigation className="w-4 h-4 text-heritage-cyan" />
          </div>
          <div>
            <p className="text-white text-xs font-bold tracking-widest uppercase">Intelligence Layer</p>
            <p className="text-heritage-cyan text-[10px] font-mono">{activeLocation ? `${currentPosition[0]}° N, ${currentPosition[1]}° E` : "Global Scan Active"}</p>
          </div>
        </div>
      </div>
      
      {/* Custom styles specifically to override Leaflet dark theme tooltips */}
      <style dangerouslySetInnerHTML={{__html:`
        .leaflet-container { font-family: inherit; background: #0b1120; outline: none; }
        .map-tooltip { background: #131b2f !important; border: 1px solid #1e293b !important; color: white !important; font-weight: bold; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(0,0,0,0.8); backdrop-filter: blur(10px); }
        .leaflet-tooltip-top:before { border-top-color: #1e293b !important; }
        .custom-popup .leaflet-popup-content-wrapper { background: #131b2f; color: white; border: 1px solid #1e293b; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); padding: 0;}
        .custom-popup .leaflet-popup-tip { background: #131b2f; border: 1px solid #1e293b; }
        .custom-popup .leaflet-popup-content { margin: 12px; }
        .leaflet-control-zoom a { background-color: #131b2f !important; color: white !important; border-color: #1e293b !important; }
        .leaflet-control-zoom a:hover { background-color: #1e293b !important; color: #06b6d4 !important; }
      `}} />
    </div>
  );
}
