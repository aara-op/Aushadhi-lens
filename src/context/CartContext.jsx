import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('hotel_vision_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Dining Mode & Selection
  const [diningMode, setDiningMode] = useState('table'); // 'table' | 'room' | 'takeaway'
  const [selectedTable, setSelectedTable] = useState(1); // Default table 1
  const [selectedSlot, setSelectedSlot] = useState('slot-5'); // Default dinner slot
  const [selectedRoom, setSelectedRoom] = useState('101');
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    phone: '',
    notes: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('hotel_vision_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (item, quantity = 1, specialNotes = '') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && cartItem.notes === specialNotes
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...item, quantity, notes: specialNotes }];
      }
    });
  };

  const updateQuantity = (index, delta) => {
    setCart(prevCart => {
      const updated = [...prevCart];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // Note: Prices in hotel menu are already tax inclusive
  const grandTotal = subtotal;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        diningMode,
        setDiningMode,
        selectedTable,
        setSelectedTable,
        selectedSlot,
        setSelectedSlot,
        selectedRoom,
        setSelectedRoom,
        guestInfo,
        setGuestInfo,
        totalItems,
        subtotal,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
