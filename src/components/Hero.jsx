import React from 'react';
import { 
  CalendarDays, 
  UtensilsCrossed, 
  Users, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelConfig';
import { MandalaMotif } from './MandalaMotif';

export const Hero = ({ onOpenBooking, onScrollToMenu, onOpenDiningSelector }) => {
  return (
    <div className="relative bg-[#0A1128] overflow-hidden border-b border-hotel-gold/30">
      
      {/* Background Image: The Hotel's actual dining hall */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hotel-dining.png" 
          alt="Hotel Vision Restaurant Dining Hall" 
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 filter blur-[0.5px]"
        />
        {/* Amber & Navy Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/85 to-[#0A1128]/70"></div>
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-black/60"></div>
      </div>

      {/* Decorative Corner Mandalas */}
      <div className="absolute top-4 left-4 pointer-events-none hidden md:block">
        <MandalaMotif className="w-24 h-24 text-hotel-gold/20" />
      </div>
      <div className="absolute top-4 right-4 pointer-events-none hidden md:block">
        <MandalaMotif className="w-24 h-24 text-hotel-gold/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-20">
        
        <div className="max-w-3xl">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-hotel-gold/15 border border-hotel-gold/40 rounded-full px-3.5 py-1.5 text-xs text-amber-300 font-semibold mb-6 shadow-gold-sm">
            <Sparkles className="w-3.5 h-3.5 text-hotel-gold animate-spin-slow" />
            <span>3-Star Deluxe Hotel & Fine Dine Restaurant</span>
            <span className="text-amber-500">•</span>
            <span className="text-amber-200">Burhanpur, M.P.</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight sm:leading-tight mb-4">
            Flavors Crafted for Royalty, <br />
            <span className="gold-gradient-text">Booked at Your Convenience.</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-8 leading-relaxed max-w-2xl font-light">
            Welcome to <strong className="text-amber-200 font-semibold">{HOTEL_CONFIG.name}</strong>. Enjoy authentic <em>Burhanpur Ka Sawad</em>, Asian starters, sizzling tandoor platters, and wholesome main courses. Reserve a slot across our <strong>24 grand tables</strong> or order straight to your room.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2.5 bg-gradient-to-r from-hotel-gold via-amber-400 to-amber-500 text-gray-950 font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base hover:shadow-gold-glow active:scale-95 transition-all shadow-lg"
            >
              <CalendarDays className="w-5 h-5 text-gray-950" />
              <span>Book a Table Slot (24 Tables)</span>
            </button>

            <button
              onClick={onScrollToMenu}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 px-5 py-3.5 rounded-xl text-sm sm:text-base transition-all"
            >
              <UtensilsCrossed className="w-5 h-5 text-hotel-gold" />
              <span>Explore Food Menu (80+ Items)</span>
            </button>

          </div>

          {/* Key Feature Badges matching user's specific table setup */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-xs text-gray-300">
            
            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2.5 border border-white/5">
              <Users className="w-4 h-4 text-hotel-gold shrink-0" />
              <div>
                <p className="font-semibold text-white">4 Family Booths</p>
                <p className="text-[11px] text-gray-400">Tables 1–4 (8 Seaters)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2.5 border border-white/5">
              <Users className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">20 Standard Tables</p>
                <p className="text-[11px] text-gray-400">Tables 5–24 (4 Seaters)</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2.5 border border-white/5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <p className="font-semibold text-white">Slot-Based Dining</p>
                <p className="text-[11px] text-gray-400">Zero waiting time</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2.5 border border-white/5">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <div>
                <p className="font-semibold text-white">100% Tax Inclusive</p>
                <p className="text-[11px] text-gray-400">Pure Veg & Authentic</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Subtle indicator to scroll down to menu */}
      <div 
        onClick={onScrollToMenu}
        className="text-center py-2 bg-gradient-to-b from-transparent to-[#0A1128] cursor-pointer text-gray-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 text-xs"
      >
        <span>Scroll to browse delicious dishes</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </div>

    </div>
  );
};
