"use client";

import React from "react";
import { X } from "lucide-react";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  facts: string[];
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, images, facts }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
      <div className="w-full max-w-[1600px] h-full flex flex-col gap-12 py-10">
        <div className="flex justify-between items-center px-4">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter">Photo Matrix</h2>
            <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] mt-2">Historical Preservation Archives</p>
          </div>
          <button
            onClick={onClose}
            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 transition-all group"
          >
            <X className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8 px-4 flex-1">
          {images.map((img, idx) => (
            <div key={idx} className="col-span-12 md:col-span-6 lg:col-span-3 aspect-square rounded-[2rem] overflow-hidden border border-white/10 relative shadow-2xl group/img animate-in zoom-in duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
              <img
                src={img}
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover/img:scale-110"
                alt="Scan Matrix"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/KONARK/download (1).jpg";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] font-mono text-white">Channel: 0{idx + 1}</p>
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest text-white translate-y-4 opacity-0 group-hover/img:translate-y-0 group-hover/img:opacity-100 transition-all duration-500">
                  Delta: {facts[idx % facts.length] || "Structural Node"}
                </h4>
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-400 shadow-[0_0_20px_#3b82f6] animate-scanline" />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-12 text-center pb-12">
          <button onClick={onClose} className="px-20 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.6em] rounded-[2rem] hover:bg-blue-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95"> Disconnect Link </button>
        </div>
      </div>
    </div>
  );
};
