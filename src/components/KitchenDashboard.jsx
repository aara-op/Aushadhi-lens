import React, { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UtensilsCrossed, 
  Users, 
  DoorClosed, 
  Volume2, 
  Search, 
  CalendarDays, 
  Sparkles,
  RefreshCw,
  Power
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { useBooking } from '../context/BookingContext';
import { HOTEL_TABLES, TIME_SLOTS } from '../data/tablesData';
import { MENU_ITEMS } from '../data/menuData';
import { HOTEL_CONFIG } from '../data/hotelConfig';

export const KitchenDashboard = ({ onExitStaffView }) => {
  const { 
    orders, 
    updateOrderStatus, 
    soldOutItems, 
    toggleItemSoldOut, 
    playServiceBellChime 
  } = useOrder();

  const { bookings, activeDate, cancelBooking } = useBooking();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'reservations' | 'menu'
  const [filterStatus, setFilterStatus] = useState('active'); // 'all' | 'active' | 'completed'
  const [menuSearch, setMenuSearch] = useState('');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'active') {
      return order.status !== 'Completed' && order.status !== 'Served';
    }
    if (filterStatus === 'completed') {
      return order.status === 'Completed' || order.status === 'Served';
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Received':
        return 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse';
      case 'Preparing':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Ready':
        return 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold';
      case 'Served':
      case 'Completed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-white flex flex-col">
      
      {/* Top Staff Navigation Header */}
      <div className="bg-[#111827] border-b border-hotel-gold/30 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-hotel-gold flex items-center justify-center text-gray-950 font-bold">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                Staff & Kitchen Control Desk
              </h2>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                Live
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {HOTEL_CONFIG.name} Burhanpur • 24 Tables Active
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'orders'
                ? 'bg-hotel-gold text-gray-950 font-bold shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Live Kitchen Orders ({orders.filter(o => o.status !== 'Completed' && o.status !== 'Served').length})
          </button>
          
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'reservations'
                ? 'bg-hotel-gold text-gray-950 font-bold shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            24 Table Slots ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'menu'
                ? 'bg-hotel-gold text-gray-950 font-bold shadow-sm'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Dish Inventory ({soldOutItems.length} Sold Out)
          </button>
        </div>

        {/* Chime Bell & Return to Customer View */}
        <div className="flex items-center gap-2">
          <button
            onClick={playServiceBellChime}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-amber-300 border border-hotel-gold/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            title="Test service call bell"
          >
            <Volume2 className="w-4 h-4 text-hotel-gold" />
            <span className="hidden sm:inline">Ring Bell</span>
          </button>

          <button
            onClick={onExitStaffView}
            className="flex items-center gap-1.5 bg-hotel-maroon hover:brightness-110 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border border-amber-500/30"
          >
            <Power className="w-3.5 h-3.5" />
            <span>Customer View</span>
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* ================= TAB 1: LIVE KITCHEN ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter Sub-bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">Filter tickets:</span>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    filterStatus === 'active' ? 'bg-amber-400 text-gray-950' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  Active Orders
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    filterStatus === 'completed' ? 'bg-amber-400 text-gray-950' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-2.5 py-1 rounded-md font-semibold ${
                    filterStatus === 'all' ? 'bg-amber-400 text-gray-950' : 'bg-white/5 text-gray-300'
                  }`}
                >
                  All
                </button>
              </div>

              <div className="text-xs text-gray-400">
                Orders are synchronized with customer screens in real time.
              </div>
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-400">
                <ChefHat className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-serif font-bold text-gray-200">No Orders in this queue</h3>
                <p className="text-xs text-gray-400 mt-1">New incoming orders from tables or rooms will pop up here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map(order => {
                  const isTable = order.diningType === 'table';
                  const isFamilyTable = isTable && order.tableNumber <= 4;

                  return (
                    <div
                      key={order.id}
                      className="bg-[#111827] border-2 border-hotel-gold/30 rounded-2xl overflow-hidden shadow-luxury flex flex-col justify-between"
                    >
                      {/* Ticket Top Header */}
                      <div className="p-4 bg-white/5 border-b border-white/10 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-amber-300">
                              #{order.id}
                            </span>
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </div>

                          {/* Destination Table / Room */}
                          <div className="mt-2 flex items-center gap-2">
                            {isTable ? (
                              <div className="flex items-center gap-1 text-sm font-bold text-white bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 rounded-lg">
                                <Users className="w-4 h-4 text-hotel-gold" />
                                <span>Table {order.tableNumber}</span>
                                {isFamilyTable && (
                                  <span className="text-[10px] text-amber-300 ml-1">(Family 8-Seater)</span>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-sm font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-lg">
                                <DoorClosed className="w-4 h-4 text-emerald-400" />
                                <span>Room {order.roomNumber}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right text-xs">
                          <span className="text-gray-400 block font-light">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="text-amber-200 font-medium block mt-1">
                            {order.guestName}
                          </span>
                        </div>
                      </div>

                      {/* Items Body */}
                      <div className="p-4 flex-1 space-y-2.5 text-xs">
                        <div className="space-y-1.5 border-b border-white/10 pb-3">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start">
                              <div>
                                <span className="font-bold text-amber-300 text-sm">{item.quantity}x</span>{' '}
                                <span className="text-gray-100 font-medium">{item.name}</span>
                                {item.notes && (
                                  <p className="text-[11px] text-amber-400 font-semibold italic pl-5">
                                    ↳ Note: {item.notes}
                                  </p>
                                )}
                              </div>
                              <span className="text-gray-400 font-mono">
                                {HOTEL_CONFIG.currencySymbol}{item.price * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Special Kitchen Notes */}
                        {order.specialInstructions && (
                          <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-[11px] text-amber-200">
                            <strong>Chef Note:</strong> {order.specialInstructions}
                          </div>
                        )}

                        <div className="flex justify-between text-xs text-gray-300 pt-1">
                          <span>Payment: {order.paymentMethod}</span>
                          <span className="font-bold text-white font-mono text-sm">
                            Total: {HOTEL_CONFIG.currencySymbol}{order.totalAmount}
                          </span>
                        </div>
                      </div>

                      {/* Quick Status Changers */}
                      <div className="p-3 bg-black/40 border-t border-white/10 grid grid-cols-3 gap-1.5 text-xs font-semibold">
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Preparing')}
                          className={`py-2 rounded-lg transition-all text-center ${
                            order.status === 'Preparing'
                              ? 'bg-blue-600 text-white font-bold'
                              : 'bg-white/10 hover:bg-white/20 text-gray-200'
                          }`}
                        >
                          1. Preparing
                        </button>

                        <button
                          onClick={() => updateOrderStatus(order.id, 'Ready')}
                          className={`py-2 rounded-lg transition-all text-center ${
                            order.status === 'Ready'
                              ? 'bg-emerald-600 text-white font-bold'
                              : 'bg-white/10 hover:bg-white/20 text-gray-200'
                          }`}
                        >
                          2. Ready
                        </button>

                        <button
                          onClick={() => updateOrderStatus(order.id, 'Served')}
                          className={`py-2 rounded-lg transition-all text-center ${
                            order.status === 'Served' || order.status === 'Completed'
                              ? 'bg-gray-700 text-gray-400'
                              : 'bg-gradient-to-r from-hotel-gold to-amber-500 text-gray-950 font-bold hover:brightness-110'
                          }`}
                        >
                          3. Served
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: 24 TABLE SLOTS SCHEDULE ================= */}
        {activeTab === 'reservations' && (
          <div className="space-y-6">
            
            <div className="bg-[#111827] p-4 rounded-2xl border border-hotel-gold/30">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-hotel-gold" />
                    <span>24 Tables Slot Schedule</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    Tables 1 to 4: 8-seater Family Booths • Tables 5 to 24: 4-seater Standard
                  </p>
                </div>

                <div className="text-xs text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  Showing Reservations for: {activeDate}
                </div>
              </div>

              {/* Bookings List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-white/5 uppercase font-semibold text-gray-400 text-[10px] tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Table No.</th>
                      <th className="p-3">Table Type</th>
                      <th className="p-3">Time Slot</th>
                      <th className="p-3">Guest Name & Phone</th>
                      <th className="p-3">Party Size</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bookings.map(b => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-400">{b.id}</td>
                        <td className="p-3">
                          <span className="font-bold text-white text-sm">Table {b.tableNumber}</span>
                        </td>
                        <td className="p-3">
                          {b.isFamily ? (
                            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-semibold text-[10px]">
                              Family (8 Seats)
                            </span>
                          ) : (
                            <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-[10px]">
                              Standard (4 Seats)
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-medium text-gray-200">{b.slotTime}</td>
                        <td className="p-3">
                          <span className="font-semibold text-white block">{b.guestName}</span>
                          <span className="text-[11px] text-gray-400">{b.guestPhone}</span>
                        </td>
                        <td className="p-3 font-bold text-white">{b.partySize} Guests</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {b.status === 'Confirmed' && (
                            <button
                              onClick={() => cancelBooking(b.id)}
                              className="text-red-400 hover:text-red-300 hover:underline text-xs"
                            >
                              Release Slot
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 3: DISH INVENTORY (86 SOLD OUT) ================= */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            
            <div className="bg-[#111827] p-4 rounded-2xl border border-hotel-gold/30">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-hotel-gold" />
                    <span>Kitchen Dish Availability Controller</span>
                  </h3>
                  <p className="text-xs text-gray-400">
                    If any kitchen ingredient runs out, toggle the dish off here. It will instantly show as "Sold Out" on the customer website.
                  </p>
                </div>

                <div className="relative w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search dishes to toggle..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-hotel-gold"
                  />
                </div>
              </div>

              {/* Dish List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[600px] overflow-y-auto pr-1">
                {MENU_ITEMS.filter(item => 
                  item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                  item.category.toLowerCase().includes(menuSearch.toLowerCase())
                ).map(item => {
                  const isSoldOut = soldOutItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                        isSoldOut 
                          ? 'bg-red-950/30 border-red-800/60 text-gray-400' 
                          : 'bg-white/5 border-white/10 hover:border-hotel-gold/40 text-white'
                      }`}
                    >
                      <div className="flex-1 pr-2">
                        <span className="block font-bold text-xs">{item.name}</span>
                        <span className="text-[10px] text-gray-400">
                          {HOTEL_CONFIG.currencySymbol}{item.price} • {item.category}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleItemSoldOut(item.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          isSoldOut
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {isSoldOut ? "Mark Available" : "Mark Sold Out"}
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
