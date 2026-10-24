import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  QrCode, 
  DoorClosed, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { HOTEL_CONFIG } from '../data/hotelConfig';
import { HOTEL_TABLES, TIME_SLOTS } from '../data/tablesData';
import confetti from 'canvas-confetti';

export const CheckoutModal = ({ isOpen, onClose, onOrderConfirmed }) => {
  const { 
    cart, 
    grandTotal, 
    clearCart, 
    diningMode, 
    selectedTable, 
    selectedSlot,
    selectedRoom 
  } = useCart();

  const { placeOrder } = useOrder();

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay at Table / Cash');
  const [kitchenNotes, setKitchenNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const currentTableObj = HOTEL_TABLES.find(t => t.number === Number(selectedTable));
  const currentSlotObj = TIME_SLOTS.find(s => s.id === selectedSlot);

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!guestName.trim() || !guestPhone.trim()) {
      alert("Please provide guest name and contact number.");
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      diningType: diningMode,
      tableNumber: diningMode === 'table' ? selectedTable : null,
      slotInfo: diningMode === 'table' ? (currentSlotObj?.time || "Immediate Dine-in") : null,
      roomNumber: diningMode === 'room' ? selectedRoom : null,
      guestName: guestName,
      guestPhone: guestPhone,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        notes: item.notes || '',
      })),
      totalAmount: grandTotal,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'Charge to Room Bill' ? 'Room Account' : 'Pending',
      specialInstructions: kitchenNotes,
    };

    setTimeout(() => {
      const confirmedOrder = placeOrder(orderPayload);
      clearCart();
      setIsSubmitting(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      onClose();
      if (onOrderConfirmed) {
        onOrderConfirmed(confirmedOrder);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-[#FAF6EE] text-[#0A1128] rounded-2xl shadow-2xl border-2 border-hotel-gold/40 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0A1128] text-white px-5 py-4 border-b border-hotel-gold/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-hotel-gold/20 flex items-center justify-center border border-hotel-gold/40">
              <Sparkles className="w-5 h-5 text-hotel-gold" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white">
                Confirm & Book Order
              </h2>
              <p className="text-xs text-gray-300">
                Direct Kitchen Relay • {HOTEL_CONFIG.taxNote}
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

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 overflow-y-auto space-y-5">
          
          {/* 1. Dining Destination Card */}
          <div className="bg-white p-3.5 rounded-xl border border-hotel-gold/30 shadow-xs flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              {diningMode === 'table' ? (
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <Users className="w-4 h-4" />
                </div>
              ) : diningMode === 'room' ? (
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <DoorClosed className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-sky-800">
                  <CreditCard className="w-4 h-4" />
                </div>
              )}
              <div>
                <span className="text-gray-500 font-medium block">Order Destination:</span>
                <span className="font-bold text-sm text-gray-900">
                  {diningMode === 'table' 
                    ? `Table ${selectedTable} (${currentTableObj?.isFamily ? 'Family 8-Seater' : 'Standard 4-Seater'})`
                    : diningMode === 'room'
                    ? `Room ${selectedRoom} (Hotel In-Room Dining)`
                    : 'Counter Takeaway'
                  }
                </span>
              </div>
            </div>

            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-200">
              Verified
            </span>
          </div>

          {/* 2. Order Summary Checklist */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100 text-xs">
              <span className="font-bold text-gray-700 uppercase tracking-wider">
                Order Items ({cart.length})
              </span>
              <span className="font-bold text-hotel-maroon text-sm">
                Total: {HOTEL_CONFIG.currencySymbol}{grandTotal}
              </span>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-1.5 text-xs">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-700">
                  <span>
                    <strong className="text-gray-900">{item.quantity}x</strong> {item.name}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {HOTEL_CONFIG.currencySymbol}{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Guest Information Form */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Guest Contact Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Verma"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp / Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Kitchen Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Serve soup first, less oil in Dal Makhani, extra napkins"
                value={kitchenNotes}
                onChange={(e) => setKitchenNotes(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-hotel-gold outline-none"
              />
            </div>
          </div>

          {/* 4. Payment Preference */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Choose Payment Method
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('Pay at Table / Cash')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  paymentMethod === 'Pay at Table / Cash'
                    ? 'border-hotel-gold bg-amber-50/70 text-gray-900 font-bold shadow-xs'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <Banknote className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="text-xs">
                  <span className="block">Pay at Table</span>
                  <span className="text-[10px] text-gray-500 font-normal">Cash or Card</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Charge to Room Bill')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  paymentMethod === 'Charge to Room Bill'
                    ? 'border-hotel-gold bg-amber-50/70 text-gray-900 font-bold shadow-xs'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <DoorClosed className="w-4 h-4 text-hotel-maroon shrink-0" />
                <div className="text-xs">
                  <span className="block">Room Account</span>
                  <span className="text-[10px] text-gray-500 font-normal">Settle on checkout</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Instant UPI / QR Code')}
                className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                  paymentMethod === 'Instant UPI / QR Code'
                    ? 'border-hotel-gold bg-amber-50/70 text-gray-900 font-bold shadow-xs'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <QrCode className="w-4 h-4 text-sky-600 shrink-0" />
                <div className="text-xs">
                  <span className="block">UPI / QR Code</span>
                  <span className="text-[10px] text-gray-500 font-normal">GPay, PhonePe, Paytm</span>
                </div>
              </button>

            </div>

            {paymentMethod === 'Instant UPI / QR Code' && (
              <div className="p-3 bg-sky-50 rounded-lg border border-sky-200 text-xs text-sky-800 flex items-center gap-2 mt-2">
                <QrCode className="w-5 h-5 text-sky-600 shrink-0" />
                <span>QR Code will be presented by the serving steward or at your table after verification.</span>
              </div>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-hotel-maroon via-[#9E1B32] to-hotel-maroon text-white font-bold py-3.5 px-6 rounded-xl text-sm sm:text-base hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Transmitting to Kitchen...</span>
              ) : (
                <>
                  <span>Confirm Order ({HOTEL_CONFIG.currencySymbol}{grandTotal})</span>
                  <ArrowRight className="w-4 h-4 text-hotel-gold" />
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-gray-500 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct kitchen transmission • Freshly prepared upon order</span>
            </p>
          </div>

        </form>

      </div>

    </div>
  );
};
