import React, { createContext, useContext, useState, useEffect } from 'react';
import { HOTEL_TABLES, TIME_SLOTS } from '../data/tablesData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Get today's ISO date string YYYY-MM-DD
  const getTodayStr = () => new Date().toISOString().split('T')[0];

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('hotel_vision_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Seed initial realistic bookings for demonstration
    const today = getTodayStr();
    return [
      {
        id: "BK-1001",
        date: today,
        slotId: "slot-5",
        slotTime: "07:00 PM - 08:30 PM",
        tableNumber: 1, // Family Table
        isFamily: true,
        partySize: 7,
        guestName: "Rajesh Khandelwal",
        guestPhone: "+91 98234 11223",
        status: "Confirmed",
        notes: "Family anniversary dinner. High chairs requested.",
        hasPreOrder: true,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: "BK-1002",
        date: today,
        slotId: "slot-5",
        slotTime: "07:00 PM - 08:30 PM",
        tableNumber: 8, // Standard Table
        isFamily: false,
        partySize: 3,
        guestName: "Pooja Sharma",
        guestPhone: "+91 97123 44556",
        status: "Confirmed",
        notes: "Corner table preferred.",
        hasPreOrder: false,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: "BK-1003",
        date: today,
        slotId: "slot-6",
        slotTime: "08:30 PM - 10:00 PM",
        tableNumber: 3, // Family Table
        isFamily: true,
        partySize: 8,
        guestName: "Dr. Alok Mehta",
        guestPhone: "+91 94220 88990",
        status: "Confirmed",
        notes: "Doctor's association get-together.",
        hasPreOrder: true,
        createdAt: new Date(Date.now() - 10800000).toISOString(),
      }
    ];
  });

  const [activeDate, setActiveDate] = useState(getTodayStr());
  const [activeSlotId, setActiveSlotId] = useState('slot-5');

  useEffect(() => {
    try {
      localStorage.setItem('hotel_vision_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Check if a specific table is reserved for a date & slot
  const isTableReserved = (date, slotId, tableNumber) => {
    return bookings.some(
      b => b.date === date && 
           b.slotId === slotId && 
           b.tableNumber === tableNumber && 
           b.status !== "Cancelled"
    );
  };

  // Get booking details for a table if reserved
  const getTableBooking = (date, slotId, tableNumber) => {
    return bookings.find(
      b => b.date === date && 
           b.slotId === slotId && 
           b.tableNumber === tableNumber && 
           b.status !== "Cancelled"
    );
  };

  // Create new slot booking
  const createBooking = (newBookingData) => {
    const newId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const slotObj = TIME_SLOTS.find(s => s.id === newBookingData.slotId);
    const tableObj = HOTEL_TABLES.find(t => t.number === Number(newBookingData.tableNumber));

    const bookingRecord = {
      id: newId,
      date: newBookingData.date || activeDate,
      slotId: newBookingData.slotId || activeSlotId,
      slotTime: slotObj ? slotObj.time : "07:00 PM - 08:30 PM",
      tableNumber: Number(newBookingData.tableNumber),
      isFamily: tableObj ? tableObj.isFamily : false,
      partySize: Number(newBookingData.partySize) || (tableObj?.isFamily ? 8 : 4),
      guestName: newBookingData.guestName,
      guestPhone: newBookingData.guestPhone,
      guestEmail: newBookingData.guestEmail || '',
      notes: newBookingData.notes || '',
      status: "Confirmed",
      hasPreOrder: Boolean(newBookingData.hasPreOrder),
      preOrderItems: newBookingData.preOrderItems || [],
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [bookingRecord, ...prev]);
    return bookingRecord;
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: "Cancelled" } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeDate,
        setActiveDate,
        activeSlotId,
        setActiveSlotId,
        isTableReserved,
        getTableBooking,
        createBooking,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
