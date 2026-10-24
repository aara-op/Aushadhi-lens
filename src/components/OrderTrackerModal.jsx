import React from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  UtensilsCrossed, 
  DoorClosed, 
  PhoneCall, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { HOTEL_CONFIG } from '../data/hotelConfig';

export const OrderTrackerModal = ({ isOpen, onClose }) => {
  const { orders, activeTrackingOrderId, setActiveTrackingOrderId, getActiveOrder } = useOrder();

  if (!isOpen) return null;

  const currentOrder = getActiveOrder();

  const stages = [
    { key: "Received", label: "Order Received", desc: "Sent to chef display", icon: CheckCircle2 },
    { key: "Preparing", label: "Kitchen Preparing", desc: "Freshly cooking on stove & tandoor", icon: ChefHat },
    { key: "Ready", label: "Ready to Serve", desc: "Plated & with steward", icon: Sparkles },
    { key: "Served", label: "Served / Completed", desc: "Delivered to your table/room", icon: UtensilsCrossed },
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Received': return 0;
      case 'Preparing': return 1;
      case 'Ready': return 2;
      case 'Served':
      case 'Completed': return 3;
      default: return 0;
    }
  };

  const currentStageIdx = currentOrder ? getStageIndex(currentOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-[#FAF6EE] text-[#0A1128] rounded-2xl shadow-2xl border-2 border-hotel-gold/40 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#0A1128] text-white px-5 py-4 border-b border-hotel-gold/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-hotel-gold/20 flex items-center justify-center border border-hotel-gold/40">
              <Clock className="w-5 h-5 text-hotel-gold animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <span>Live Order Tracker</span>
                {currentOrder && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                    #{currentOrder.id}
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-300">
                Real-Time Kitchen Transmission Status
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

        {/* Content */}
        {!currentOrder ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">No active order currently found to track.</p>
            <button
              onClick={onClose}
              className="mt-4 bg-[#0A1128] text-amber-300 px-4 py-2 rounded-lg text-xs font-bold"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          <div className="p-5 overflow-y-auto space-y-6">
            
            {/* Orders Tab Switcher if multiple */}
            {orders.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {orders.map(o => (
                  <button
                    key={o.id}
                    onClick={() => setActiveTrackingOrderId(o.id)}
                    className={`px-3 py-1.5 rounded-lg font-mono font-medium border transition-all whitespace-nowrap ${
                      o.id === activeTrackingOrderId
                        ? 'bg-[#0A1128] text-amber-300 border-hotel-gold font-bold shadow-xs'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    #{o.id} ({o.diningType === 'table' ? `Table ${o.tableNumber}` : `Room ${o.roomNumber}`})
                  </button>
                ))}
              </div>
            )}

            {/* Status Highlight Banner */}
            <div className="bg-gradient-to-br from-[#0A1128] to-[#1E293B] text-white p-4 rounded-xl border border-hotel-gold/30 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                    Current Status:
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                    {stages[currentStageIdx]?.label}
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {stages[currentStageIdx]?.desc}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block">Destination</span>
                  <span className="text-sm font-bold text-hotel-gold block">
                    {currentOrder.diningType === 'table' 
                      ? `Table ${currentOrder.tableNumber}` 
                      : currentOrder.diningType === 'room'
                      ? `Room ${currentOrder.roomNumber}`
                      : 'Takeaway Pickup'}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-200/90">
                <span>Guest: {currentOrder.guestName}</span>
                <span>Payment: {currentOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-hotel-gold/30">
              {stages.map((stage, idx) => {
                const isCompleted = idx <= currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                const Icon = stage.icon;

                return (
                  <div key={stage.key} className="relative flex items-start gap-3.5">
                    
                    {/* Step Icon / Dot */}
                    <div className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCurrent
                        ? 'bg-hotel-gold border-amber-500 text-gray-950 shadow-gold-sm scale-110'
                        : isCompleted
                        ? 'bg-emerald-600 border-emerald-700 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div>
                      <h4 className={`text-sm font-bold ${
                        isCurrent ? 'text-hotel-maroon' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {stage.label}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {stage.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Order Items Ticket */}
            <div className="bg-white rounded-xl p-4 border border-hotel-gold/25 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2.5 pb-1.5 border-b border-gray-100">
                Ordered Items ({currentOrder.items?.length || 0})
              </h4>

              <div className="space-y-2 text-xs">
                {currentOrder.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-gray-900">{item.quantity}x</span>{' '}
                      <span className="text-gray-800">{item.name}</span>
                      {item.notes && (
                        <p className="text-[10px] text-amber-700 italic">"{item.notes}"</p>
                      )}
                    </div>
                    <span className="font-semibold text-gray-900">
                      {HOTEL_CONFIG.currencySymbol}{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-2.5 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-900">
                <span>Grand Total:</span>
                <span className="text-hotel-maroon">
                  {HOTEL_CONFIG.currencySymbol}{currentOrder.totalAmount}
                </span>
              </div>
            </div>

            {/* Help & Support Assistance */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-hotel-gold-dark shrink-0" />
                <span className="text-gray-700">Need to modify or call your steward?</span>
              </div>
              <a 
                href={`tel:${HOTEL_CONFIG.phone}`}
                className="font-bold text-hotel-maroon hover:underline"
              >
                Call Desk
              </a>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
