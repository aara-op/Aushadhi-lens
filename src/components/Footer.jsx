import React from 'react';
import { 
  PhoneCall, 
  MapPin, 
  Clock, 
  Wifi, 
  ShieldCheck, 
  UtensilsCrossed, 
  Heart,
  Sparkles
} from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelConfig';
import { MandalaMotif } from './MandalaMotif';

export const Footer = ({ onOpenBooking, onScrollToMenu }) => {
  return (
    <footer className="bg-[#070D1F] text-gray-300 border-t-2 border-hotel-gold/40 relative overflow-hidden">
      
      {/* Decorative top mandala pattern line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-hotel-gold via-amber-400 to-hotel-maroon"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-hotel-gold flex items-center justify-center text-gray-950 font-bold">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                  {HOTEL_CONFIG.name}
                </h3>
                <span className="text-[10px] text-amber-300 font-semibold tracking-widest uppercase">
                  Restaurant & Banquet
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Serving the authentic heritage flavors of Burhanpur alongside rich North Indian, Asian, Tandoori sizzlers, and South Indian specialties.
            </p>

            <div className="pt-2 text-xs flex items-center gap-1.5 text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Pure Vegetarian Kitchen</span>
            </div>
          </div>

          {/* Col 2: Operating Timings */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-hotel-gold" />
              <span>Dining Timings</span>
            </h4>

            <ul className="text-xs space-y-2 text-gray-300">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>Multi-Cuisine Dining:</span>
                <span className="font-semibold text-white">{HOTEL_CONFIG.openingHours.restaurant}</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <span>South Indian Corner:</span>
                <span className="font-semibold text-amber-200">{HOTEL_CONFIG.openingHours.southIndian}</span>
              </li>
              <li className="flex justify-between">
                <span>In-Room Dining:</span>
                <span className="font-semibold text-emerald-400">{HOTEL_CONFIG.openingHours.roomService}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: 24 Tables & Table Booking */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-hotel-gold" />
              <span>Table Amenities</span>
            </h4>

            <ul className="text-xs space-y-2 text-gray-300">
              <li>• <strong>Tables 1 to 4:</strong> Luxury Family Booths (8 Seats each)</li>
              <li>• <strong>Tables 5 to 24:</strong> Standard Fine Dine (4 Seats each)</li>
              <li>• Slot-based reservation to prevent waiting lines</li>
              <li>• Direct table QR ordering enabled</li>
            </ul>

            <button
              onClick={onOpenBooking}
              className="mt-1 text-xs font-bold text-hotel-gold hover:underline flex items-center gap-1"
            >
              <span>Reserve a slot online &rarr;</span>
            </button>
          </div>

          {/* Col 4: Location & Guest WiFi */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-hotel-gold" />
              <span>Location & Contact</span>
            </h4>

            <p className="text-xs text-gray-300">
              {HOTEL_CONFIG.address}
            </p>

            <div className="text-xs text-gray-300 space-y-1">
              <p className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-hotel-gold" />
                <a href={`tel:${HOTEL_CONFIG.phone}`} className="hover:text-amber-200">
                  {HOTEL_CONFIG.phone}
                </a>
              </p>
            </div>

            {/* In-house guest WiFi */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                <Wifi className="w-3.5 h-3.5" />
                <span>Complimentary Guest WiFi</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Network: <span className="text-white font-mono">{HOTEL_CONFIG.wifi.ssid}</span>
              </p>
              <p className="text-[11px] text-gray-400">
                Password: <span className="text-white font-mono">{HOTEL_CONFIG.wifi.pass}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} {HOTEL_CONFIG.name}. All rights reserved. {HOTEL_CONFIG.taxNote}.
          </p>
          <p className="flex items-center gap-1">
            <span>Designed for Hotel Hospitality Excellence</span>
          </p>
        </div>

      </div>

    </footer>
  );
};
