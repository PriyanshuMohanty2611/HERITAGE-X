"use client";

import React from "react";
import { 
  X, MapPin, Ticket, Calendar, CreditCard, 
  QrCode, Smartphone, ShieldCheck, Loader2, 
  Shield, Check 
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
  React.useEffect(() => {
    if (bookingStatus === "success") {
      window.dispatchEvent(new CustomEvent("heritage-pulse"));
    }
  }, [bookingStatus]);

  if (step === "idle") return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-white border-t border-slate-200">
      
      {/* Background Asset */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[-1]">
        <img src={selectedMonument?.image} className="w-full h-full object-cover grayscale blur-2xl" alt="bg" />
      </div>

      <div className="w-full max-w-5xl rounded-[3rem] overflow-hidden flex flex-col relative border border-slate-200 bg-white shadow-2xl">
        
        {/* Modern Header */}
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl group overflow-hidden relative">
               <Ticket className="w-8 h-8 text-white relative z-10" />
            </div>
            <div>
              <h3 className="text-3xl font-black text-slate-950 italic uppercase tracking-tighter leading-none">Secure Passage</h3>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.5em] mt-2">{selectedMonument?.name || "Neural Gateway"}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-red-500 hover:text-white transition-all text-slate-400 flex items-center justify-center active:scale-90 border border-slate-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-10 relative z-10 flex-1 overflow-y-auto max-h-[75vh] scrollbar-hide">
          {step === "location" && (
            <div className="animate-in slide-in-from-right-12 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-8">
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-4 px-1">Verification Node</label>
                    <div className="flex items-center gap-6 p-6 bg-slate-50/80 rounded-[2rem] border border-slate-100 shadow-inner group transition-all hover:bg-white hover:shadow-xl hover:border-blue-200">
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 transition-all group-hover:scale-110">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Spatial Pulse</p>
                        <span className="text-sm font-black text-slate-950 uppercase tracking-tight">{userLocation || "Syncing Geodesic Node..."}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-4 px-1">Temporal Windows</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {timeSlots.map((slot, i) => (
                        <button 
                          key={i} 
                          onClick={() => onSetBookingDetails({...bookingDetails, time: slot.time})}
                          className={`p-5 rounded-[1.8rem] border transition-all text-left flex flex-col gap-4 group relative overflow-hidden ${bookingDetails.time === slot.time ? 'bg-blue-600 border-blue-600 shadow-xl' : 'bg-slate-50 border-slate-100 hover:border-blue-300 hover:bg-white'}`}
                        >
                          <div className="flex items-center justify-between w-full relative z-10">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${bookingDetails.time === slot.time ? 'bg-white shadow-lg' : 'bg-white border border-slate-100'}`}>
                               <Calendar className={`w-5 h-5 ${bookingDetails.time === slot.time ? 'text-blue-600' : 'text-slate-400'}`} />
                            </div>
                            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${bookingDetails.time === slot.time ? 'bg-white border-blue-500 text-blue-600' : 'bg-white border-slate-200'}`}>
                               {bookingDetails.time === slot.time && <Check className="w-4 h-4" /> }
                            </div>
                          </div>
                          <div className="relative z-10">
                             <p className={`text-[12px] font-black uppercase tracking-widest mb-1 ${bookingDetails.time === slot.time ? 'text-white' : 'text-slate-950'}`}>{slot.time}</p>
                             <p className={`text-[8px] font-bold uppercase tracking-[0.1em] ${bookingDetails.time === slot.time ? 'text-white/80' : 'text-slate-400'}`}>Capacity: {slot.left}/{slot.limit} Reserved</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 rounded-[3rem] p-10 border border-slate-100 flex flex-col justify-between text-center group relative overflow-hidden min-h-[400px]">
                   <div className="space-y-8 relative z-10">
                      <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-slate-100 shadow-xl">
                        <ShieldCheck className="w-12 h-12 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-slate-950 italic uppercase tracking-tighter">Authorization Required</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-4 leading-relaxed opacity-70">Neural verification and temporal selection required for ledger finalization.</p>
                      </div>
                   </div>
                   <button onClick={() => onStepChange("payment")} className="w-full py-6 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl shadow-xl transition-all hover:bg-slate-900 relative z-10 active:scale-95 border-none">
                    Synchronize Access
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-10 animate-in slide-in-from-right-12 duration-700 max-w-4xl mx-auto">
              <div>
                <h4 className="text-3xl font-black text-slate-950 uppercase tracking-tighter text-center mb-10 italic">Currency <span className="text-blue-600">Linkage</span></h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { id: "upi", label: "UPI Node", icon: <Smartphone className="w-7 h-7" />, desc: "Instant Verification" },
                    { id: "card", label: "Card Matrix", icon: <CreditCard className="w-7 h-7" />, desc: "Secure POS Link" },
                    { id: "crypto", label: "H-Ledger", icon: <QrCode className="w-7 h-7" />, desc: "P2P Transfer" }
                  ].map((method) => (
                    <button 
                      key={method.id}
                      onClick={() => onSetPaymentMethod(method.id)}
                      className={`p-6 rounded-[2rem] border transition-all text-center flex flex-col items-center gap-6 group relative overflow-hidden ${paymentMethod === method.id ? 'bg-blue-600 border-blue-600 scale-[1.05] shadow-2xl' : 'bg-slate-50 border-slate-100 hover:border-blue-300 hover:bg-white'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all ${paymentMethod === method.id ? 'bg-white text-blue-600' : 'bg-white border border-slate-100 text-slate-400 group-hover:text-blue-600'}`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className={`text-sm font-black uppercase tracking-tighter ${paymentMethod === method.id ? 'text-white italic' : 'text-slate-950'}`}>{method.label}</p>
                        <p className={`text-[8px] font-bold uppercase tracking-widest mt-1 opacity-60 ${paymentMethod === method.id ? 'text-blue-100' : 'text-slate-500'}`}>{method.desc}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all ${paymentMethod === method.id ? 'bg-white border-blue-500' : 'bg-white border-slate-100'}`}>
                        {paymentMethod === method.id ? <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_white]" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200" /> }
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex items-center justify-between">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Payload</p>
                    <p className="text-3xl font-black text-slate-950 italic tracking-tighter">$15.00 <span className="text-[10px] text-blue-600 uppercase tracking-[0.4em] ml-2 font-black">Secure Entry</span></p>
                 </div>
                 <button 
                  onClick={onFinalize} 
                  disabled={isProcessing || !paymentMethod}
                  className="px-12 py-5 bg-blue-600 hover:bg-slate-950 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl shadow-xl transition-all flex items-center gap-4 disabled:opacity-50 active:scale-95 border-none"
                >
                  {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  {isProcessing ? "Validating..." : "Authorize Pay"}
                </button>
              </div>
            </div>
          )}

          {step === "scanner" && (
            <div className="space-y-12 text-center animate-in zoom-in-95 duration-1000 max-w-2xl mx-auto flex flex-col items-center pb-10">
              {bookingStatus === "success" ? (
                <div className="py-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000 w-full">
                  <div className="w-40 h-40 rounded-full bg-emerald-50 border-8 border-emerald-100 flex items-center justify-center mb-10 relative shadow-2xl">
                    <ShieldCheck className="w-20 h-20 text-emerald-500 shadow-emerald-500/20" />
                  </div>
                  <h4 className="text-5xl font-black text-slate-950 uppercase tracking-tighter mb-4 italic leading-none">200 OK SUCCESS</h4>
                  <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.6em] mb-10">Access Node Synchronized</p>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200">
                    <div className="w-full h-full bg-emerald-500" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative inline-block group mb-10">
                    <div className="relative p-8 bg-white rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] group-hover:shadow-[0_60px_120px_rgba(59,130,246,0.2)] transition-all duration-700 border border-slate-100">
                      <div className="w-64 h-64 bg-slate-50 p-2 rounded-[3rem] relative overflow-hidden flex items-center justify-center border-4 border-slate-50 shadow-inner">
                        <img 
                          src="/scanner.jpg" 
                          className="w-full h-full object-cover rounded-[3rem] opacity-90 transition-opacity" 
                          alt="Auth" 
                        />
                        <div className="absolute inset-x-0 h-1 bg-blue-500 shadow-[0_0_30px_#3b82f6] z-30" />
                      </div>
                      <div className="absolute top-0 left-0 w-20 h-20 border-t-[10px] border-l-[10px] border-blue-600 rounded-tl-[4rem]" />
                      <div className="absolute top-0 right-0 w-20 h-20 border-t-[10px] border-r-[10px] border-slate-950 rounded-tr-[4rem]" />
                      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-[10px] border-l-[10px] border-slate-950 rounded-bl-[4rem]" />
                      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-[10px] border-r-[10px] border-slate-950 rounded-br-[4rem]" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] font-mono leading-none">Terminal v5.0 Active</span>
                    </div>
                    <h4 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">Terminal Scan Initiated</h4>
                    <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase opacity-70 leading-relaxed max-w-[360px] mx-auto">Authenticate currency transfer via any authorized node. Encryption Verified.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Secure Footer - Light Glass */}
        <div className="p-8 bg-slate-50/80 backdrop-blur-3xl border-t border-slate-100 flex items-center justify-center gap-12">
          <div className="flex items-center gap-3 group cursor-help">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <Shield className="w-5 h-5 text-emerald-500 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-slate-950 transition-colors">SSL v5 Secure</span>
          </div>
          <div className="flex items-center gap-3 group cursor-help">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Smartphone className="w-5 h-5 text-blue-500 group-hover:text-white" />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] group-hover:text-slate-950 transition-colors">Neural Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
};
