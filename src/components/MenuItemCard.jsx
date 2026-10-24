import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Sparkles, 
  Flame, 
  MessageSquare, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { HOTEL_CONFIG } from '../data/hotelConfig';

export const MenuItemCard = ({ item }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { isItemSoldOut } = useOrder();

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [cookingNote, setCookingNote] = useState('');

  const soldOut = isItemSoldOut(item.id);

  // Find item occurrences in cart
  const cartEntries = cart
    .map((c, index) => ({ ...c, originalIndex: index }))
    .filter(c => c.id === item.id);

  const totalQuantityInCart = cartEntries.reduce((sum, c) => sum + c.quantity, 0);

  const handleAddFirstTime = () => {
    if (soldOut) return;
    addToCart(item, 1, cookingNote);
    setIsNotesOpen(false);
    setCookingNote('');
  };

  const handleIncrement = () => {
    if (soldOut) return;
    if (cartEntries.length > 0) {
      updateQuantity(cartEntries[0].originalIndex, 1);
    } else {
      addToCart(item, 1, '');
    }
  };

  const handleDecrement = () => {
    if (cartEntries.length > 0) {
      updateQuantity(cartEntries[0].originalIndex, -1);
    }
  };

  return (
    <div className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-luxury ${
      soldOut 
        ? 'opacity-65 border-gray-200' 
        : item.isChefSpecial
        ? 'border-amber-300 hover:border-hotel-gold'
        : 'border-hotel-gold/20 hover:border-hotel-gold/60'
    }`}>
      
      {/* Dish Visual Header */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback image if unsplash link fails
            e.target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=60";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 items-center">
          
          {/* Veg Indicator Box */}
          <div className="bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border border-emerald-600/30 flex items-center justify-center">
            <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
            </div>
          </div>

          {/* Chef's Burhanpur Special Badge */}
          {item.isChefSpecial && (
            <span className="inline-flex items-center gap-1 bg-hotel-maroon text-amber-200 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm border border-amber-400/40">
              <Sparkles className="w-3 h-3 text-hotel-gold" />
              Special
            </span>
          )}

          {/* Popular Badge */}
          {item.isPopular && !item.isChefSpecial && (
            <span className="bg-[#0A1128]/90 text-amber-300 font-semibold text-[10px] px-2 py-0.5 rounded border border-hotel-gold/30">
              Bestseller
            </span>
          )}
        </div>

        {/* Spice Level Indicator */}
        {item.spicyLevel && item.spicyLevel > 1 && (
          <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-red-300 flex items-center gap-0.5 font-medium border border-red-500/30">
            <Flame className="w-3 h-3 text-red-400" />
            <span>{item.spicyLevel === 3 ? "Extra Spicy" : "Medium Spicy"}</span>
          </div>
        )}

        {/* Bottom price preview */}
        <div className="absolute bottom-2.5 left-3 text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold font-serif text-amber-300">
              {HOTEL_CONFIG.currencySymbol}{item.price}
            </span>
            <span className="text-[10px] text-gray-300 uppercase tracking-wide">
              Tax Inc.
            </span>
          </div>
        </div>

        {/* Sold Out Overlay */}
        {soldOut && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-md shadow-md border border-white/20">
              Sold Out for Today
            </span>
          </div>
        )}

      </div>

      {/* Dish Content Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        
        <div>
          <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 group-hover:text-hotel-maroon transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Add note drawer if expanded */}
        {isNotesOpen && (
          <div className="mt-3 p-2 bg-amber-50/80 rounded-lg border border-amber-200 animate-fadeIn">
            <div className="flex justify-between items-center mb-1 text-[11px] font-semibold text-gray-700">
              <span>Cooking note for chef:</span>
              <button 
                onClick={() => setIsNotesOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-xs"
              >
                ✕
              </button>
            </div>
            <input 
              type="text" 
              placeholder="e.g. Less spicy, no onion, extra crispy" 
              value={cookingNote}
              onChange={(e) => setCookingNote(e.target.value)}
              className="w-full text-xs p-1.5 bg-white border border-gray-300 rounded focus:ring-1 focus:ring-hotel-gold outline-none"
            />
            <button
              onClick={handleAddFirstTime}
              className="w-full mt-1.5 bg-hotel-maroon text-white text-[11px] font-bold py-1 rounded hover:brightness-110"
            >
              Add with Instruction
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          
          <button
            type="button"
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className="text-[11px] text-gray-500 hover:text-hotel-maroon flex items-center gap-1 transition-colors"
            title="Add special instructions for kitchen"
          >
            <MessageSquare className="w-3 h-3 text-amber-600" />
            <span className="hidden xs:inline">Special Note</span>
          </button>

          {/* Quantity Controls */}
          {totalQuantityInCart > 0 ? (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-hotel-gold rounded-xl p-0.5 shadow-sm">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-lg bg-white text-gray-800 flex items-center justify-center hover:bg-gray-100 active:scale-95 shadow-xs border border-gray-200"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-gray-900">
                {totalQuantityInCart}
              </span>
              <button
                onClick={handleIncrement}
                disabled={soldOut}
                className="w-7 h-7 rounded-lg bg-gradient-to-r from-hotel-gold to-amber-500 text-gray-950 flex items-center justify-center font-bold hover:brightness-110 active:scale-95 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddFirstTime}
              disabled={soldOut}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
                soldOut
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-hotel-gold to-amber-500 text-gray-950 hover:shadow-gold-sm hover:brightness-105'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
