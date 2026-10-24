import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

// Synthetic Luxury Chime Sound using Web Audio API
const playServiceBellChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Play two gentle harmonious chimes (like a hotel reception bell)
    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playTone(880, now, 0.8);        // A5 note
    playTone(1320, now + 0.1, 1.2);  // E6 note
  } catch (e) {
    // Audio might be blocked until user interacts with document
    console.log("Audio alert handled:", e);
  }
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('hotel_vision_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Realistic initial active orders for testing
    return [
      {
        id: "VIS-9281",
        diningType: "table",
        tableNumber: 1, // Family table
        slotInfo: "Slot 5 (07:00 PM - 08:30 PM)",
        guestName: "Rajesh Khandelwal",
        guestPhone: "+91 98234 11223",
        items: [
          { id: "as-13", name: "Chinese Sizzler Combo", price: 350, quantity: 1, notes: "Extra crispy noodles" },
          { id: "bks-1", name: "Sev Tomato Ki Subzi", price: 120, quantity: 2, notes: "Medium spicy" },
          { id: "bks-2", name: "Kaju Curry", price: 190, quantity: 1, notes: "" },
          { id: "tc-1", name: "Vision Masala Chai", price: 30, quantity: 4, notes: "Less sugar" },
        ],
        subtotal: 840,
        totalAmount: 840,
        paymentMethod: "Pay at Table / Cash",
        paymentStatus: "Pending",
        status: "Preparing", // Received, Preparing, Ready, Served, Completed
        createdAt: new Date(Date.now() - 900000).toISOString(), // 15 mins ago
        estimatedMinutes: 10,
        specialInstructions: "Please serve Chai after main course.",
      },
      {
        id: "VIS-9282",
        diningType: "room",
        roomNumber: "204",
        guestName: "Vikram Malhotra",
        guestPhone: "+91 98450 67890",
        items: [
          { id: "mc-14", name: "Paneer Tikka Masala", price: 210, quantity: 1, notes: "" },
          { id: "dal-4", name: "Dal Makhani", price: 150, quantity: 1, notes: "Extra butter" },
          { id: "pap-2", name: "Masala Papad", price: 40, quantity: 2, notes: "" },
        ],
        subtotal: 440,
        totalAmount: 440,
        paymentMethod: "Add to Room Bill",
        paymentStatus: "Charged to Room",
        status: "Received",
        createdAt: new Date(Date.now() - 180000).toISOString(), // 3 mins ago
        estimatedMinutes: 20,
        specialInstructions: "Room bell please don't knock hard, baby sleeping.",
      }
    ];
  });

  // Track customer's current tracking order
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(() => {
    return localStorage.getItem('hotel_vision_active_order') || "VIS-9281";
  });

  // Out of stock / Sold out items
  const [soldOutItems, setSoldOutItems] = useState(() => {
    try {
      const saved = localStorage.getItem('hotel_vision_soldout');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hotel_vision_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('hotel_vision_soldout', JSON.stringify(soldOutItems));
    } catch (e) {
      console.error(e);
    }
  }, [soldOutItems]);

  const placeOrder = (orderData) => {
    const newOrderId = `VIS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      diningType: orderData.diningType || 'table',
      tableNumber: orderData.tableNumber || null,
      slotInfo: orderData.slotInfo || null,
      roomNumber: orderData.roomNumber || null,
      guestName: orderData.guestName || 'Guest',
      guestPhone: orderData.guestPhone || '',
      items: orderData.items,
      subtotal: orderData.totalAmount,
      totalAmount: orderData.totalAmount,
      paymentMethod: orderData.paymentMethod || 'Pay at Table',
      paymentStatus: orderData.paymentStatus || 'Pending',
      status: 'Received',
      createdAt: new Date().toISOString(),
      estimatedMinutes: 20,
      specialInstructions: orderData.specialInstructions || '',
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrderId);
    localStorage.setItem('hotel_vision_active_order', newOrderId);

    // Play chime sound
    playServiceBellChime();

    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const toggleItemSoldOut = (itemId) => {
    setSoldOutItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const isItemSoldOut = (itemId) => soldOutItems.includes(itemId);

  const getActiveOrder = () => {
    return orders.find(o => o.id === activeTrackingOrderId) || orders[0] || null;
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        getActiveOrder,
        placeOrder,
        updateOrderStatus,
        soldOutItems,
        toggleItemSoldOut,
        isItemSoldOut,
        playServiceBellChime,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
