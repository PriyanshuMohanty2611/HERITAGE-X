"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { X, Navigation, LocateFixed, Map as MapIcon, Compass, Zap } from "lucide-react";

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface NeuralRouteMapProps {
  source: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number };
  onClose?: () => void;
  onUpdateDestination: (coords: { lat: number; lng: number }) => void;
  onUpdateSource: (coords: { lat: number; lng: number }) => void;
  inline?: boolean;
}

function MapEvents({ onMapClick }: { onMapClick: (e: any) => void }) {
  useMapEvents({
    click: (e) => onMapClick(e),
  });
  return null;
}

export default function NeuralRouteMap({ 
  source, 
  destination, 
  onClose, 
  onUpdateDestination,
  onUpdateSource,
  inline = false
}: NeuralRouteMapProps) {
  const [useSourceInput, setUseSourceInput] = useState(false);
  const [inputLat, setInputLat] = useState(destination.lat.toString());
  const [inputLng, setInputLng] = useState(destination.lng.toString());

  const handleManualSubmit = () => {
    const lat = parseFloat(inputLat);
    const lng = parseFloat(inputLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      onUpdateDestination({ lat, lng });
    }
  };

  const polylineCoords: [number, number][] = source 
    ? [[source.lat, source.lng], [destination.lat, destination.lng]] 
    : [];

  const mapContent = (
    <div className={`relative w-full h-full bg-slate-900 overflow-hidden flex flex-col ${inline ? '' : 'max-w-5xl h-[80vh] rounded-[3.5rem] shadow-4xl border border-white/5 animate-in fade-in zoom-in duration-500'}`}>
      {!inline && (
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-xl">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
               <Navigation className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Neural Route Terminal</p>
               <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Spatial Matrix Navigator</h3>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-all border border-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full">
        {/* Map Node */}
        <div className="flex-1 relative bg-slate-950 min-h-[400px]">
          <MapContainer 
            center={[destination.lat, destination.lng]} 
            zoom={13} 
            style={{ height: "100%", width: "100%" }}
            className={`z-10 ${inline ? 'opacity-90 grayscale-[0.2] invert-[0.9]' : ''}`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {source && (
              <Marker position={[source.lat, source.lng]}>
                <Popup>
                  <span className="font-black uppercase text-[10px]">Your Current Node</span>
                </Popup>
              </Marker>
            )}
            <Marker position={[destination.lat, destination.lng]}>
              <Popup>
                <span className="font-black uppercase text-[10px]">Destination Hub</span>
              </Popup>
            </Marker>
            {source && <Polyline positions={polylineCoords} color="#2563eb" weight={4} dashArray="10, 10" />}
            <MapEvents onMapClick={(e: any) => onUpdateDestination(e.latlng)} />
          </MapContainer>

          {/* Quick Overlays */}
          <div className="absolute bottom-6 right-6 z-20 space-y-3">
             <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-3xl shadow-xl flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <LocateFixed className="w-4 h-4 text-emerald-500" />
                   <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Active Tracking</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
             </div>
          </div>
        </div>

        {/* Controls Console - ONLY if not inline */}
        {!inline && (
          <div className="w-full lg:w-96 bg-slate-900 border-l border-white/5 p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-8">
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <MapIcon className="w-4 h-4 text-blue-600" />
                     <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">Coordinate Terminal</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Latitude Node</label>
                        <input 
                           type="text" 
                           value={inputLat}
                           onChange={(e) => setInputLat(e.target.value)}
                           className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-sm font-black outline-none focus:border-blue-600 transition-all font-mono text-white" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Longitude Node</label>
                        <input 
                           type="text" 
                           value={inputLng}
                           onChange={(e) => setInputLng(e.target.value)}
                           className="w-full bg-slate-950 border border-white/5 rounded-2xl p-4 text-sm font-black outline-none focus:border-blue-600 transition-all font-mono text-white" 
                        />
                     </div>
                     <button 
                        onClick={handleManualSubmit}
                        className="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-lg"
                     >
                        UPDATE_SPATIAL_SYNC
                     </button>
                  </div>
               </div>

               <div className="h-px w-full bg-white/5" />

               <div className="space-y-4 text-slate-400">
                  <div className="flex items-center gap-3">
                     <Compass className="w-4 h-4 text-blue-600" />
                     <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">Navigation Analytics</h4>
                  </div>
                  <div className="p-5 bg-blue-600/5 rounded-3xl border border-blue-500/10 space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase">
                        <span>Point A (User)</span>
                        <span className="text-blue-600">{source ? "SYNCED" : "OFFLINE"}</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black uppercase">
                        <span>Point B (Guide Hub)</span>
                        <span className="text-rose-500">ACTIVE_DEST</span>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <p className="text-[8px] font-medium leading-relaxed italic">Click anywhere on the spatial matrix to recalibrate your destination hub.</p>
                      </div>
                   </div>
                </div>
             </div>
 
             <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl text-white">
                   <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                   </div>
                   <p className="text-[9px] font-medium leading-tight opacity-70 uppercase tracking-wider">Neural-Link v2.4 Active for Real-time Spatial Processing</p>
                </div>
             </div>
           </div>
         )}
       </div>
     </div>
   );
 
   if (inline) {
     return <div className="w-full h-full relative">{mapContent}</div>;
   }
 
   return (
     <div className="fixed inset-0 z-2000 flex items-center justify-center p-4 md:p-8">
       <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-2xl" onClick={onClose} />
       {mapContent}
     </div>
   );
 }
