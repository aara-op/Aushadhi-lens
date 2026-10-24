import React from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  ChefHat, 
  UtensilsCrossed, 
  Soup, 
  Wheat, 
  Pizza, 
  CookingPot, 
  Coffee, 
  Salad, 
  CircleDot, 
  GlassWater, 
  Citrus, 
  CupSoda 
} from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

// Map icon strings to Lucide components
const iconMap = {
  UtensilsCrossed,
  Soup,
  Wheat,
  Pizza,
  ChefHat,
  Sparkles,
  Flame,
  CookingPot,
  Coffee,
  Salad,
  CircleDot,
  GlassWater,
  Citrus,
  CupSoda
};

export const CategoryNav = ({ 
  activeCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  filterOnlyChefSpecial,
  onToggleChefSpecial
}) => {
  return (
    <div className="sticky top-[69px] sm:top-[77px] z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-hotel-gold/30 py-3 px-4 shadow-sm">
      
      <div className="max-w-7xl mx-auto space-y-3">
        
        {/* Search bar & quick filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search dishes (e.g., Paneer, Dal, Maggie)..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-hotel-gold/30 focus:outline-none focus:ring-2 focus:ring-hotel-gold shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            <button
              onClick={onToggleChefSpecial}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                filterOnlyChefSpecial 
                  ? 'bg-hotel-maroon text-amber-200 border-hotel-maroon shadow-sm'
                  : 'bg-white text-gray-700 border-hotel-gold/30 hover:bg-amber-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-hotel-gold" />
              <span>Chef's Burhanpur Specials</span>
            </button>

            <span className="text-[11px] text-gray-500 hidden md:inline-block">
              Showing 100% Tax Inclusive Prices
            </span>
          </div>

        </div>

        {/* Scrollable Category Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {MENU_CATEGORIES.map(cat => {
            const Icon = iconMap[cat.icon] || UtensilsCrossed;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap border shrink-0 ${
                  isActive
                    ? 'bg-[#0A1128] text-amber-300 border-hotel-gold font-bold shadow-md transform -translate-y-0.5'
                    : 'bg-white text-gray-700 border-hotel-gold/25 hover:border-hotel-gold hover:bg-amber-50/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-hotel-gold' : 'text-gray-500'}`} />
                <span>{cat.name}</span>
                {cat.special && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                )}
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-hotel-gold/20 text-amber-200' : 'bg-gray-100 text-gray-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
