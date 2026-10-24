import React, { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  UtensilsCrossed, 
  Info,
  ChevronRight
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useCart } from '../context/CartContext';
import { HOTEL_TABLES, TIME_SLOTS } from '../data/tablesData';
import { HOTEL_CONFIG } from '../data/hotelConfig';
import confetti from 'canvas-confetti';

export const TableSlotBookingModal = ({ isOpen, onClose, onPreOrderFromMenu }) => {
  const { 
    activeDate, 
    setActiveDate, 
    activeSlotId, 
    setActiveSlotId, 
    isTableReserved, 
    createBooking 
  } = useBooking();

  const { setSelectedTable, setSelectedSlot, setDiningMode } = useCart();

  // Selected table in modal
  const [selectedTableNum, setSelectedTableNum] = useState(1);
  const [partySize, setPartySize] = useState(6);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);

  if (!isOpen) return null;

  // Compute upcoming 5 dates
  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({ iso, label });
    }
    return dates;
  };

  const datesList = getDates();
  const activeSlot = TIME_SLOTS.find(s => s.id === activeSlotId);
  const currentTableObj = HOTEL_TABLES.find(t => t.number === selectedTableNum);

  // Check if currently selected table is reserved
  const isSelectedReserved = isTableReserved(activeDate, activeSlotId, selectedTableNum);

  const handleSelectTable = (table) => {
    setSelectedTableNum(table.number);
    // Adjust party size suggestion based on capacity
    if (table.isFamily) {
      if (partySize < 5) setPartySize(6);
    } else {
      if (partySize > 4) setPartySize(4);
    }
  };

  const handleSubmitBooking = (e, shouldPreOrder = false) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) {
      alert("Please provide guest name and mobile number for the booking confirmation.");
      return;
    }

    if (isSelectedReserved) {
      alert("This table is already reserved for this slot. Please choose another table.");
      return;
    }

    const newBooking = createBooking({
      date: activeDate,
      slotId: activeSlotId,
      tableNumber: selectedTableNum,
      partySize: partySize,
      guestName: guestName,
      guestPhone: guestPhone,
      notes: specialNotes,
      hasPreOrder: shouldPreOrder,
    });

    // Update cart context table & slot
    setSelectedTable(selectedTableNum);
    setSelectedSlot(activeSlotId);
    setDiningMode('table');

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setBookingSuccess(newBooking);

    if (shouldPreOrder) {
      setTimeout(() => {
        onClose();
        if (onPreOrderFromMenu) onPreOrderFromMenu();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-[#FAF6EE] text-[#0A1128] rounded-2xl shadow-2xl border-2 border-hotel-gold/40 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#0A1128] text-white px-5 py-4 border-b border-hotel-gold/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-hotel-gold/20 border border-hotel-gold/40 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-hotel-gold" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                <span>Book a Table Slot</span>
                <span className="text-xs font-sans font-normal bg-hotel-gold/20 text-amber-300 border border-hotel-gold/30 px-2 py-0.5 rounded-full">
                  24 Total Tables
                </span>
              </h2>
              <p className="text-xs text-gray-300">
                Tables 1–4 (Family Booths - 8 Guests) • Tables 5–24 (Standard - 4 Guests)
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success confirmation view */}
        {bookingSuccess ? (
          <div className="p-8 text-center bg-[#FAF6EE] flex flex-col items-center justify-center my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-hotel-gold-dark">Reservation Confirmed</span>
            <h3 className="text-2xl font-serif font-bold text-[#0A1128] mt-1 mb-2">
              Booking Ref: <span className="text-hotel-maroon">{bookingSuccess.id}</span>
            </h3>
            <p className="text-sm text-gray-700 max-w-md mb-6 leading-relaxed">
              We have reserved <strong>Table {bookingSuccess.tableNumber} ({bookingSuccess.isFamily ? 'Family 8-Seater' : 'Standard 4-Seater'})</strong> for <strong>{bookingSuccess.guestName}</strong> on <strong>{bookingSuccess.date}</strong> for <strong>{bookingSuccess.slotTime}</strong>.
            </p>

            <div className="bg-white border border-hotel-gold/30 rounded-xl p-4 text-left w-full max-w-sm mb-6 text-xs space-y-2 shadow-sm">
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-gray-500">Party Size:</span>
                <span className="font-semibold">{bookingSuccess.partySize} Guests</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-gray-500">Mobile:</span>
                <span className="font-semibold">{bookingSuccess.guestPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-bold text-emerald-600">Reserved & Active</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setBookingSuccess(null);
                  onClose();
                  if (onPreOrderFromMenu) onPreOrderFromMenu();
                }}
                className="bg-gradient-to-r from-hotel-maroon to-[#9E1B32] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 shadow-md flex items-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Pre-Order Food From Menu Now</span>
              </button>
              <button
                onClick={() => {
                  setBookingSuccess(null);
                  onClose();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (

          /* Interactive Booking Form */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* 1. Date & Slot Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-hotel-gold/25 shadow-sm">
              
              {/* Date Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4 text-hotel-gold-dark" />
                  <span>Select Date:</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {datesList.map(d => (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => setActiveDate(d.iso)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        activeDate === d.iso
                          ? 'bg-[#0A1128] text-amber-300 border-hotel-gold font-bold shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-hotel-gold-dark" />
                  <span>Select Time Slot:</span>
                </label>
                <select
                  value={activeSlotId}
                  onChange={(e) => setActiveSlotId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-hotel-gold focus:border-hotel-gold outline-none"
                >
                  {TIME_SLOTS.map(slot => (
                    <option key={slot.id} value={slot.id}>
                      {slot.label} ({slot.period})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* 2. Visual 24-Table Layout Map */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-hotel-gold-dark" />
                  <span>Select Table (Floor Plan):</span>
                </label>
                <div className="flex items-center gap-3 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span>
                    <span>Available</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-red-400 inline-block"></span>
                    <span>Reserved</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-600 inline-block"></span>
                    <span>Selected</span>
                  </span>
                </div>
              </div>

              {/* SECTION A: Family Tables 1, 2, 3, 4 (8 Seaters) */}
              <div className="mb-4 bg-amber-500/10 border-2 border-hotel-gold/50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Family Tables 1, 2, 3 & 4 (Capacity: 8 Guests Each)</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded">
                    Center Luxury Booths
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {HOTEL_TABLES.slice(0, 4).map(table => {
                    const reserved = isTableReserved(activeDate, activeSlotId, table.number);
                    const isSelected = selectedTableNum === table.number;

                    return (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => handleSelectTable(table)}
                        disabled={reserved}
                        className={`relative p-3 rounded-xl border-2 text-left transition-all ${
                          reserved 
                            ? 'bg-gray-100 border-red-200 text-gray-400 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-[#0A1128] text-amber-300 border-hotel-gold shadow-md transform scale-[1.02]'
                            : 'bg-white border-amber-300 hover:border-amber-500 text-gray-800 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm">Table {table.number}</span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            8 Seats
                          </span>
                        </div>
                        <p className={`text-[11px] ${isSelected ? 'text-amber-200/80' : 'text-gray-500'}`}>
                          Family Booth
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold">
                          {reserved ? (
                            <span className="text-red-500 flex items-center gap-0.5">
                              <AlertCircle className="w-3 h-3" /> Reserved
                            </span>
                          ) : (
                            <span className={isSelected ? 'text-emerald-300' : 'text-emerald-600'}>
                              ✓ Available
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION B: Standard Tables 5 to 24 (4 Seaters) */}
              <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gray-500" />
                    <span>Standard Tables 5 to 24 (Capacity: 4 Guests Each)</span>
                  </span>
                  <span className="text-[10px] text-gray-500">
                    Window & Dining Hall Rows
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
                  {HOTEL_TABLES.slice(4).map(table => {
                    const reserved = isTableReserved(activeDate, activeSlotId, table.number);
                    const isSelected = selectedTableNum === table.number;

                    return (
                      <button
                        key={table.id}
                        type="button"
                        onClick={() => handleSelectTable(table)}
                        disabled={reserved}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          reserved 
                            ? 'bg-gray-100 border-red-200 text-gray-400 cursor-not-allowed opacity-50'
                            : isSelected
                            ? 'bg-[#0A1128] text-amber-300 border-hotel-gold font-bold shadow-sm'
                            : 'bg-gray-50 hover:bg-amber-50 border-gray-200 text-gray-800'
                        }`}
                        title={reserved ? `Table ${table.number} is booked` : `Table ${table.number} (4 Seats)`}
                      >
                        <span className="block text-xs font-bold">T-{table.number}</span>
                        <span className="block text-[9px] text-gray-500">4 seats</span>
                        <span className={`block text-[9px] font-semibold mt-0.5 ${
                          reserved ? 'text-red-500' : isSelected ? 'text-emerald-300' : 'text-emerald-600'
                        }`}>
                          {reserved ? 'Booked' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* 3. Booking Details & Guest Information */}
            <form onSubmit={(e) => handleSubmitBooking(e, false)} className="bg-white p-4 sm:p-5 rounded-xl border border-hotel-gold/30 shadow-sm space-y-4">
              
              <div className="flex flex-wrap items-center justify-between border-b pb-3 text-xs gap-2">
                <span className="text-gray-500 font-medium">Your Selected Table & Slot:</span>
                <div className="flex items-center gap-2 font-bold text-gray-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <span className="text-hotel-maroon">
                    Table {selectedTableNum} ({currentTableObj?.isFamily ? 'Family 8-Seater' : 'Standard 4-Seater'})
                  </span>
                  <span>•</span>
                  <span className="text-gray-700">{activeSlot?.time}</span>
                </div>
              </div>

              {isSelectedReserved && (
                <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>
                    Table {selectedTableNum} is already reserved for this slot. Please select another green table above.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Guest Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Sharma Family"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 9876543210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
                  />
                </div>

                {/* Party Size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    No. of Guests (Max {currentTableObj?.capacity})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={currentTableObj?.capacity || 8}
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
                  />
                </div>

              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Special Notes / Occasion (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., High chair needed, celebrating anniversary, quiet corner"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
                />
              </div>

              {/* Action Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-end items-center">
                
                <button
                  type="submit"
                  disabled={isSelectedReserved}
                  className="w-full sm:w-auto bg-[#0A1128] hover:bg-[#1E293B] text-amber-300 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all border border-hotel-gold/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Table Slot Only
                </button>

                <button
                  type="button"
                  disabled={isSelectedReserved}
                  onClick={(e) => handleSubmitBooking(e, true)}
                  className="w-full sm:w-auto bg-gradient-to-r from-hotel-maroon to-[#9E1B32] text-white font-bold px-6 py-2.5 rounded-lg text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UtensilsCrossed className="w-4 h-4 text-hotel-gold" />
                  <span>Reserve Table & Pre-Order Dishes</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};
