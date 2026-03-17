"use client";

import React from "react";
import { 
  X, MapPin, Ticket, Calendar, CreditCard, 
  QrCode, Smartphone, ShieldCheck, Loader2, 
  Shield 
} from "lucide-react";
import { Monument } from "../types";

interface BookingModalProps {
  step: "idle" | "location" | "payment" | "scanner";
  onClose: () => void;
  selectedMonument: Monument;
  userLocation: string;
  bookingDetails: any;
  onSetBookingDetails: (details: any) => void;
  paymentMethod: string | null;
  onSetPaymentMethod: (method: string) => void;
  isProcessing: boolean;
  bookingStatus: "idle" | "success" | "error";
  onFinalize: () => void;
  onStepChange: (step: "location" | "payment" | "scanner") => void;
  timeSlots: { time: string; limit: number; left: number }[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  step,
  onClose,
  selectedMonument,
  userLocation,
  bookingDetails,
  onSetBookingDetails,
  paymentMethod,
  onSetPaymentMethod,
  isProcessing,
  bookingStatus,
  onFinalize,
  onStepChange,
  timeSlots
}: BookingModalProps) => {
  if (step === "idle") return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 backdrop-blur-[50px] bg-white/80 animate-in fade-in duration-700">
      
      {/* Background Asset */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[-1]">
        <img src={selectedMonument?.image} className="w-full h-full object-cover grayscale blur-2xl" alt="bg" />
      </div>

      <div className="w-full max-w-lg rounded-[4rem] shadow-[0_60px_150px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 relative border border-white/50 bg-white">
        
        {/* Modern Header */}
        <div className="p-12 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent animate-[pulse_2s_infinite]" />
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-slate-950 rounded-[2rem] flex items-center justify-center shadow-2xl rotate-3 group overflow-hidden relative">
               <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
               <Ticket className="w-10 h-10 text-white relative z-10" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-slate-950 italic uppercase tracking-tighter leading-none">Secure Passage</h3>
              <p className="text-[11px] text-blue-600 font-black uppercase tracking-[0.5em] mt-3">{selectedMonument?.name || "Neural Gateway"}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-red-500 hover:text-white transition-all text-slate-400 flex items-center justify-center active:scale-90 border border-slate-200 shadow-sm">
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-14 relative z-10 flex-1 overflow-y-auto max-h-[65vh] scrollbar-hide">
          {step === "location" && (
            <div className="space-y-12 animate-in slide-in-from-right-12 duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-6 px-1">Verification Node</label>
                    <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner group transition-all hover:bg-white hover:shadow-xl hover:border-blue-200">
                      <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform group-hover:scale-110">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Spatial Pulse</p>
                        <span className="text-base font-black text-slate-950 uppercase tracking-tight">{userLocation || "Syncing Geodesic Node..."}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-6 px-1">Temporal Windows</label>
                    <div className="grid grid-cols-1 gap-4">
                      {timeSlots.map((slot, i) => (
                        <button 
                          key={i} 
                          onClick={() => onSetBookingDetails({...bookingDetails, time: slot.time})}
                          className={`p-6 rounded-[2rem] border transition-all text-left flex justify-between items-center group relative overflow-hidden ${bookingDetails.time === slot.time ? 'bg-slate-950 border-slate-950 scale-[1.02] shadow-2xl' : 'bg-slate-50 border-slate-100 hover:border-blue-300 hover:bg-white'}`}
                        >
                          <div className="flex items-center gap-6 relative z-10">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${bookingDetails.time === slot.time ? 'bg-blue-600 shadow-xl' : 'bg-white border border-slate-100 shadow-sm'}`}>
                               <Calendar className={`w-6 h-6 ${bookingDetails.time === slot.time ? 'text-white' : 'text-slate-400'}`} />
                            </div>
                            <div>
                               <p className={`text-[13px] font-black uppercase tracking-widest leading-none mb-2 ${bookingDetails.time === slot.time ? 'text-white' : 'text-slate-950'}`}>{slot.time}</p>
                               <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${bookingDetails.time === slot.time ? 'text-blue-400' : 'text-slate-400'}`}>Capacity: {slot.left}/{slot.limit} Reserved</p>
                            </div>
                          </div>
                          <div className={`w-10 h-10 rounded-2xl border-2 flex items-center justify-center transition-all relative z-10 ${bookingDetails.time === slot.time ? 'bg-blue-600 border-blue-500 shadow-xl' : 'bg-white border-slate-100 shadow-sm opacity-50'}`}>
                             {bookingDetails.time === slot.time && <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" /> }
                          </div>
                          {bookingDetails.time === slot.time && <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-transparent opacity-50" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-[4rem] p-12 shadow-2xl flex flex-col justify-center text-center space-y-10 group relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="w-32 h-32 bg-white/5 rounded-full mx-auto flex items-center justify-center border-4 border-white/10 shadow-3xl group-hover:scale-110 transition-transform relative z-10">
                    <ShieldCheck className="w-16 h-16 text-blue-500 drop-shadow-[0_0_20px_#3b82f6]" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">Authorization Required</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-6 leading-relaxed opacity-80 max-w-[280px] mx-auto">System requires spatial verification and temporal slot selection to proceed with ledger entry.</p>
                  </div>
                  <button onClick={() => onStepChange("payment")} className="w-full py-7 bg-white text-slate-950 text-[12px] font-black uppercase tracking-[0.5em] rounded-[2rem] shadow-2xl transition-all mt-6 hover:bg-blue-600 hover:text-white relative z-10 active:scale-95 border-none">
                    Synchronize Access
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-12 animate-in slide-in-from-right-12 duration-700 max-w-4xl mx-auto">
              <div>
                <h4 className="text-4xl font-black text-slate-950 uppercase tracking-tighter text-center mb-16 italic">Currency <span className="text-blue-600">Linkage</span></h4>
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { id: "upi", label: "Unified Interface (UPI)", icon: <Smartphone className="w-8 h-8" />, color: "text-blue-600", desc: "Scan to pay instantly via node" },
                    { id: "card", label: "Card Matrix Terminal", icon: <CreditCard className="w-8 h-8" />, color: "text-indigo-600", desc: "Secure POS end-to-end processing" },
                    { id: "crypto", label: "Heritage Ledger", icon: <QrCode className="w-8 h-8" />, color: "text-amber-500", desc: "Zero-fee decentralized transfer" }
                  ].map((method) => (
                    <button 
                      key={method.id}
                      onClick={() => onSetPaymentMethod(method.id)}
                      className={`p-8 rounded-[3rem] border transition-all text-left flex items-center gap-10 group relative overflow-hidden ${paymentMethod === method.id ? 'bg-slate-950 border-slate-950 scale-[1.02] shadow-2xl' : 'bg-slate-50 border-slate-100 hover:border-blue-300 hover:shadow-xl hover:bg-white'}`}
                    >
                      <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center shadow-xl transition-all ${paymentMethod === method.id ? 'bg-blue-600 shadow-blue-600/40 text-white' : 'bg-white border border-slate-100 text-slate-400 group-hover:text-slate-950'}`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`text-xl font-black uppercase tracking-tighter ${paymentMethod === method.id ? 'text-white italic' : 'text-slate-950'}`}>{method.label}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-[0.4em] mt-2 opacity-60 ${paymentMethod === method.id ? 'text-blue-400' : 'text-slate-500'}`}>{method.desc}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-[1.1rem] border-2 flex items-center justify-center transition-all ${paymentMethod === method.id ? 'bg-blue-600 border-blue-500' : 'bg-white border-slate-100 group-hover:border-blue-300'}`}>
                        {paymentMethod === method.id ? <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]" /> : <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-200 transition-colors" /> }
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={onFinalize} 
                disabled={isProcessing || !paymentMethod}
                className="w-full py-8 bg-blue-600 hover:bg-slate-950 text-white text-[13px] font-black uppercase tracking-[0.6em] rounded-[2.5rem] shadow-[0_20px_50px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-6 disabled:opacity-50 active:scale-95 border-none"
              >
                {isProcessing ? <Loader2 className="w-8 h-8 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                {isProcessing ? "Validating Ledger..." : "Authorize Selection"}
              </button>
            </div>
          )}

          {step === "scanner" && (
            <div className="space-y-16 text-center animate-in zoom-in-95 duration-1000 max-w-2xl mx-auto flex flex-col items-center">
              {bookingStatus === "success" ? (
                <div className="py-20 flex flex-col items-center animate-in fade-in zoom-in duration-1000 w-full">
                  <div className="w-48 h-48 rounded-full bg-emerald-50 border-8 border-emerald-100 flex items-center justify-center mb-12 relative shadow-2xl">
                    <ShieldCheck className="w-24 h-24 text-emerald-500 shadow-emerald-500/20" />
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-[ping_3s_linear_infinite] opacity-10" />
                  </div>
                  <h4 className="text-6xl font-black text-slate-950 uppercase tracking-tighter mb-6 italic leading-none">200 OK SUCCESS</h4>
                  <p className="text-[12px] text-emerald-500 font-black uppercase tracking-[0.6em] mb-12">Access Node Synchronized</p>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200">
                    <div className="w-full h-full bg-emerald-500 animate-[progress_3s_ease-out]" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative inline-block group">
                    <div className="relative p-10 bg-white rounded-[5rem] shadow-[0_60px_120px_rgba(0,0,0,0.1)] group-hover:shadow-[0_80px_160px_rgba(59,130,246,0.2)] transition-all duration-700 border border-slate-100">
                      <div className="w-80 h-80 bg-slate-50 p-2 rounded-[3.5rem] relative overflow-hidden flex items-center justify-center border-4 border-slate-50 shadow-inner">
                        <img 
                          src="/scanner.jpg" 
                          className="w-full h-full object-cover rounded-[3.5rem] opacity-90 group-hover:opacity-100 transition-opacity" 
                          alt="Auth" 
                        />
                        <div className="absolute inset-x-0 h-1 bg-blue-500 shadow-[0_0_30px_#3b82f6] animate-[scanline_3s_linear_infinite] z-30" />
                        <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent pointer-events-none" />
                      </div>
                      <div className="absolute top-0 left-0 w-24 h-24 border-t-[12px] border-l-[12px] border-slate-950 rounded-tl-[5rem]" />
                      <div className="absolute top-0 right-0 w-24 h-24 border-t-[12px] border-r-[12px] border-slate-950 rounded-tr-[5rem]" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[12px] border-l-[12px] border-slate-950 rounded-bl-[5rem]" />
                      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[12px] border-r-[12px] border-slate-950 rounded-br-[5rem]" />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-[pulse_1s_infinite] shadow-[0_0_10px_#10b981]" />
                      <span className="text-[12px] font-black text-emerald-600 uppercase tracking-[0.5em] font-mono leading-none">Terminal v5.0 Active</span>
                    </div>
                    <h4 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">Terminal Scan Initiated</h4>
                    <p className="text-[11px] text-slate-400 mb-10 font-bold tracking-[0.3em] uppercase opacity-80 leading-relaxed max-w-[400px] mx-auto">Use any authorized terminal to authenticate currency transfer. Encryption Verified.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Secure Footer - Light Glass */}
        <div className="p-10 bg-slate-50/80 backdrop-blur-3xl border-t border-slate-100 flex items-center justify-center gap-16">
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
              <Shield className="w-6 h-6 text-emerald-500 group-hover:text-white" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-slate-950 transition-colors">SSL v5 Secure</span>
          </div>
          <div className="flex items-center gap-4 group cursor-help">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <Smartphone className="w-6 h-6 text-blue-500 group-hover:text-white" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-slate-950 transition-colors">Neural Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};
