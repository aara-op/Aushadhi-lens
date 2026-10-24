import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  UtensilsCrossed, 
  Users, 
  DoorClosed, 
  ArrowRight,
  ShieldCheck,
  CalendarDays
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { HOTEL_CONFIG } from '../data/hotelConfig';
import { HOTEL_TABLES, TIME_SLOTS } from '../data/tablesData';

export const CartDrawer = ({ isOpen, onClose, onOpenCheckout, onOpenBooking }) => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    grandTotal, 
    diningMode, 
    setDiningMode,
    selectedTable, 
    setSelectedTable,
    selectedSlot,
    selectedRoom, 
    setSelectedRoom 
  } = useCart();

  if (!isOpen) return null;

  const currentTableObj = HOTEL_TABLES.find(t => t.number === Number(selectedTable));
  const currentSlotObj = TIME_SLOTS.find(s => s.id === selectedSlot);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs flex justify-end animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-[#FAF6EE] text-[#0A1128] h-full shadow-2xl flex flex-col border-l border-hotel-gold/30">
        
        {/* Drawer Header */}
        <div className="bg-[#0A1128] text-white p-4 border-b border-hotel-gold/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-hotel-gold/20 flex items-center justify-center border border-hotel-gold/40">
              <ShoppingBag className="w-5 h-5 text-hotel-gold" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <span>Your Order Ticket</span>
                <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-sans font-medium">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </h2>
              <p className="text-[11px] text-gray-300">Live Kitchen Transmission</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dining Context Selector (Table vs Room vs Takeaway) */}
        <div className="p-3 bg-white border-b border-hotel-gold/20 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center justify-between">
            <span>Dining Destination:</span>
            <button 
              onClick={onOpenBooking} 
              className="text-hotel-maroon hover:underline font-semibold flex items-center gap-0.5 text-[11px]"
            >
              <CalendarDays className="w-3 h-3" />
              <span>Table Slots</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setDiningMode('table')}
              className={`py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all ${
                diningMode === 'table'
                  ? 'bg-[#0A1128] text-amber-300 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Dine-In</span>
            </button>
            <button
              onClick={() => setDiningMode('room')}
              className={`py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all ${
                diningMode === 'room'
                  ? 'bg-[#0A1128] text-amber-300 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DoorClosed className="w-3.5 h-3.5" />
              <span>Room Order</span>
            </button>
            <button
              onClick={() => setDiningMode('takeaway')}
              className={`py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all ${
                diningMode === 'takeaway'
                  ? 'bg-[#0A1128] text-amber-300 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Takeaway</span>
            </button>
          </div>

          {/* Location picker based on mode */}
          <div className="mt-2 text-xs">
            {diningMode === 'table' ? (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-lg">
                <span className="text-gray-700">Select Table (1–24):</span>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(Number(e.target.value))}
                  className="bg-white border border-amber-300 rounded font-bold text-gray-900 px-2 py-0.5 text-xs focus:ring-1 focus:ring-hotel-gold outline-none"
                >
                  {HOTEL_TABLES.map(t => (
                    <option key={t.id} value={t.number}>
                      Table {t.number} {t.isFamily ? '(Family 8-Seater)' : '(4-Seater)'}
                    </option>
                  ))}
                </select>
              </div>
            ) : diningMode === 'room' ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
                <span className="text-gray-700">Enter Room Number:</span>
                <input
                  type="text"
                  placeholder="e.g. 204"
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-24 bg-white border border-emerald-300 rounded font-bold text-gray-900 px-2 py-0.5 text-xs text-center focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>
            ) : (
              <div className="text-center text-[11px] text-gray-500 py-1">
                Order will be packed at the restaurant front desk for pickup.
              </div>
            )}
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-3 text-amber-700">
                <UtensilsCrossed className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-serif font-bold text-lg text-gray-800">Your cart is empty</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Explore our Asian starters, Burhanpur Ka Sawad, and sizzling platters to start booking your order.
              </p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white rounded-xl p-3 border border-hotel-gold/25 shadow-xs flex flex-col justify-between gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 border border-emerald-600 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {HOTEL_CONFIG.currencySymbol}{item.price} each
                    </p>
                    {item.notes && (
                      <p className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-1 italic border border-amber-200/60 inline-block">
                        Note: "{item.notes}"
                      </p>
                    )}
                  </div>

                  <span className="font-bold text-sm text-gray-900">
                    {HOTEL_CONFIG.currencySymbol}{item.price * item.quantity}
                  </span>
                </div>

                {/* Counter & delete */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(index, -1)}
                      className="w-6 h-6 rounded bg-white text-gray-700 flex items-center justify-center hover:bg-gray-200 shadow-xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(index, 1)}
                      className="w-6 h-6 rounded bg-gradient-to-r from-hotel-gold to-amber-500 text-gray-950 flex items-center justify-center hover:brightness-110 shadow-xs"
                    >
                      <Plus className="w-3 h-3 font-bold" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout Action */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-hotel-gold/30 p-4 space-y-3 shadow-lg">
            
            {/* Bill breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-medium text-gray-900">{HOTEL_CONFIG.currencySymbol}{grandTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Goods & Service Taxes:</span>
                </span>
                <span className="font-semibold">Included (0% Extra)</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-gray-950 pt-2 border-t border-gray-200">
                <span>Total Payable:</span>
                <span className="text-hotel-maroon text-lg">
                  {HOTEL_CONFIG.currencySymbol}{grandTotal}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="px-3 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-semibold transition-colors"
                title="Clear all items"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="flex-1 bg-gradient-to-r from-hotel-maroon via-[#9E1B32] to-hotel-maroon hover:brightness-110 active:scale-95 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book & Transmit Order</span>
                <ArrowRight className="w-4 h-4 text-hotel-gold" />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
