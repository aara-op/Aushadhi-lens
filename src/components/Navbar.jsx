import React from 'react';
import { 
  ShoppingBag, 
  Clock, 
  UtensilsCrossed, 
  CalendarDays, 
  Users, 
  DoorClosed, 
  ChefHat, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { HOTEL_CONFIG } from '../data/hotelConfig';
import { MandalaMotif } from './MandalaMotif';

export const Navbar = ({ 
  onOpenCart, 
  onOpenBooking, 
  onOpenTracker, 
  onToggleStaffView, 
  isStaffView 
}) => {
  const { totalItems, grandTotal, diningMode, selectedTable, selectedRoom } = useCart();
  const { orders } = useOrder();

  const activeOrdersCount = orders.filter(
    o => o.status !== 'Completed' && o.status !== 'Cancelled'
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0A1128]/95 backdrop-blur-md border-b border-hotel-gold/30 text-white shadow-luxury">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-hotel-maroon via-[#9E1B32] to-hotel-maroon py-1 px-4 text-xs font-medium text-amber-100 flex items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Kitchen Active • 100% Pure Veg • {HOTEL_CONFIG.taxNote}</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-amber-200/90 text-xs">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-hotel-gold" />
              <span>Table Inquiry: {HOTEL_CONFIG.phone}</span>
            </span>
            <span className="border-l border-amber-300/30 pl-3">24 Tables (4 Family Booths)</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-hotel-gold via-amber-500 to-amber-700 flex items-center justify-center p-0.5 shadow-gold-sm">
              <div className="w-full h-full bg-[#0A1128] rounded-[7px] flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-hotel-gold group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-hotel-maroon px-1 py-0.2 text-[9px] font-bold text-amber-300 rounded border border-amber-400/30">
                3★
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span className="gold-gradient-text">{HOTEL_CONFIG.name}</span>
                </h1>
                <span className="text-[10px] uppercase tracking-wider bg-hotel-gold/15 text-hotel-gold-light border border-hotel-gold/30 px-2 py-0.5 rounded font-semibold hidden md:inline-block">
                  Restaurant
                </span>
              </div>
              <p className="text-[11px] text-gray-300 hidden sm:block">
                Burhanpur Specialty & Royal Multi-Cuisine
              </p>
            </div>
          </div>

          {/* Quick Context Pill (Selected Table / Room) */}
          <div className="hidden lg:flex items-center bg-white/5 border border-hotel-gold/25 rounded-full px-3 py-1.5 text-xs text-amber-200/90 gap-2">
            <span className="text-gray-400">Ordering Mode:</span>
            {diningMode === 'table' ? (
              <span className="flex items-center gap-1 font-semibold text-hotel-gold bg-hotel-gold/10 px-2 py-0.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                Table {selectedTable} {selectedTable <= 4 ? '(Family 8-Seater)' : '(4-Seater)'}
              </span>
            ) : diningMode === 'room' ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <DoorClosed className="w-3.5 h-3.5" />
                Room {selectedRoom}
              </span>
            ) : (
              <span className="font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
                Takeaway
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Table Slot Reservation Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 bg-gradient-to-r from-hotel-gold to-amber-500 text-gray-950 font-semibold px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-gold-sm"
              title="Book a slot among the 24 tables"
            >
              <CalendarDays className="w-4 h-4 text-gray-950" />
              <span className="hidden sm:inline">Book Table Slot</span>
              <span className="sm:hidden">Book Slot</span>
            </button>

            {/* Order Tracker Button */}
            <button
              onClick={onOpenTracker}
              className="relative flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-gray-200 border border-white/15 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all"
              title="Track live food orders"
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Track Order</span>
              {activeOrdersCount > 0 && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </button>

            {/* Staff Kitchen Dashboard Toggle */}
            <button
              onClick={onToggleStaffView}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg text-xs sm:text-sm border transition-all ${
                isStaffView 
                  ? 'bg-amber-400 text-gray-950 border-amber-300 font-bold shadow-gold-sm' 
                  : 'bg-white/5 text-amber-200/80 border-hotel-gold/20 hover:border-hotel-gold/50'
              }`}
              title="Kitchen and Staff Management view"
            >
              <ChefHat className="w-4 h-4 text-hotel-gold" />
              <span className="hidden md:inline">{isStaffView ? "Customer Menu" : "Kitchen Staff"}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-hotel-maroon to-[#9E1B32] hover:brightness-110 text-white px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all border border-amber-500/30 shadow-md active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 text-hotel-gold" />
              <span className="hidden sm:inline">Order Bill:</span>
              <span className="font-bold text-amber-300">
                {HOTEL_CONFIG.currencySymbol}{grandTotal}
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-gray-950 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
