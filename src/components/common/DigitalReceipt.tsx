import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { CheckCircle2, QrCode, Printer, X, Coffee, Clock, Sparkles } from 'lucide-react';

interface Props {
  order: Order;
  onClose: () => void;
}

export const DigitalReceipt: React.FC<Props> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-950/80 backdrop-blur-md animate-fadeIn">
      <div className="receipt-paper max-w-sm w-full rounded-2xl p-6 border border-coffee-200/80 shadow-2xl text-coffee-950 relative overflow-hidden animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-coffee-100 hover:bg-coffee-200 flex items-center justify-center text-coffee-800 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Cafe Branding */}
        <div className="text-center pb-4 border-b border-dashed border-coffee-300">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-caramel to-caramel-dark flex items-center justify-center text-white shadow-warm mb-2">
            <Coffee className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-xl font-bold tracking-tight text-coffee-950">
            Tap-a-Latte
          </h2>
          <p className="text-[11px] text-coffee-600 font-medium">
            Self-Ordering Kiosk • Kabacan, North Cotabato
          </p>
          <p className="text-[10px] text-coffee-400 mt-0.5">
            Specialty Coffee & Artisan Bakes
          </p>
        </div>

        {/* Queue Token Highlight */}
        <div className="my-4 p-3 rounded-2xl bg-coffee-50 border border-coffee-200 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-coffee-600 block">
            Your Order Queue Ticket
          </span>
          <div className="text-3xl font-extrabold text-caramel tracking-wider font-mono my-1">
            {order.orderNumber}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-coffee-700">
            <span className="capitalize px-2 py-0.5 rounded-full bg-white border border-coffee-200 text-[11px]">
              {order.orderType === 'dine_in' ? '🍽️ Dine In' : '🛍️ Take Out'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              {order.paymentStatus === 'paid' ? 'PAID' : 'PAY AT COUNTER'}
            </span>
          </div>
        </div>

        {/* Metadata info */}
        <div className="text-[11px] space-y-1 text-coffee-600 pb-3 border-b border-dashed border-coffee-300">
          <div className="flex justify-between">
            <span>Customer:</span>
            <span className="font-bold text-coffee-900">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time:</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Mode:</span>
            <span className="font-semibold uppercase text-coffee-900">{order.paymentMethod}</span>
          </div>
          {order.paymentReference && (
            <div className="flex justify-between font-mono text-[10px]">
              <span>Reference No:</span>
              <span className="text-coffee-700">{order.paymentReference}</span>
            </div>
          )}
        </div>

        {/* Order Items Breakdown */}
        <div className="py-3 space-y-2 border-b border-dashed border-coffee-300 max-h-48 overflow-y-auto">
          {order.items.map((item, idx) => (
            <div key={idx} className="text-xs">
              <div className="flex justify-between font-bold text-coffee-900">
                <span>{item.quantity}x {item.productName}</span>
                <span className="font-mono">₱{item.totalPrice.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-coffee-500 pl-4 space-y-0.5">
                <div>• {item.cupSize} | {item.temperature} | {item.sugarLevel} Sugar</div>
                {item.milkOption !== 'Fresh Milk' && (
                  <div>• {item.milkOption}</div>
                )}
                {item.selectedAddons && item.selectedAddons.length > 0 && (
                  <div>• Add-ons: {item.selectedAddons.map(a => a.name).join(', ')}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="py-3 space-y-1 border-b border-coffee-300 text-xs">
          <div className="flex justify-between text-coffee-600">
            <span>Subtotal:</span>
            <span className="font-mono">₱{order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount:</span>
              <span className="font-mono">-₱{order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-extrabold text-coffee-950 pt-1">
            <span>TOTAL AMOUNT:</span>
            <span className="font-mono text-base text-caramel">₱{order.totalAmount.toFixed(2)}</span>
          </div>
          {order.cashReceived && (
            <div className="flex justify-between text-[11px] text-coffee-600 pt-1 font-mono">
              <span>Cash Tendered:</span>
              <span>₱{order.cashReceived.toFixed(2)}</span>
            </div>
          )}
          {order.changeAmount !== undefined && order.changeAmount > 0 && (
            <div className="flex justify-between text-[11px] text-emerald-700 font-bold font-mono">
              <span>Change:</span>
              <span>₱{order.changeAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* QR Code Simulation & Barcode */}
        <div className="my-4 text-center">
          <div className="w-24 h-24 mx-auto p-1.5 bg-white border border-coffee-300 rounded-xl shadow-sm flex items-center justify-center">
            {/* SVG QR Code pattern */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-coffee-900">
              <rect x="0" y="0" width="30" height="30" rx="3" fill="#2E190E" />
              <rect x="6" y="6" width="18" height="18" rx="2" fill="#FFFDF9" />
              <rect x="10" y="10" width="10" height="10" fill="#2E190E" />

              <rect x="70" y="0" width="30" height="30" rx="3" fill="#2E190E" />
              <rect x="76" y="6" width="18" height="18" rx="2" fill="#FFFDF9" />
              <rect x="80" y="10" width="10" height="10" fill="#2E190E" />

              <rect x="0" y="70" width="30" height="30" rx="3" fill="#2E190E" />
              <rect x="6" y="76" width="18" height="18" rx="2" fill="#FFFDF9" />
              <rect x="10" y="80" width="10" height="10" fill="#2E190E" />

              <rect x="36" y="10" width="8" height="8" fill="#C67C4E" />
              <rect x="48" y="20" width="8" height="8" fill="#2E190E" />
              <rect x="36" y="36" width="28" height="28" rx="4" fill="#C67C4E" />
              <rect x="44" y="44" width="12" height="12" rx="2" fill="#FFFDF9" />
              <rect x="70" y="45" width="8" height="15" fill="#2E190E" />
              <rect x="45" y="75" width="15" height="8" fill="#2E190E" />
              <rect x="75" y="75" width="18" height="18" fill="#2E190E" />
            </svg>
          </div>
          <span className="text-[10px] text-coffee-500 font-mono mt-1 block">
            Scan to track live order preparation
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 px-3 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Slip
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-xl bg-caramel hover:bg-caramel-dark text-white text-xs font-bold transition-all shadow-sm"
          >
            Done / Next Customer
          </button>
        </div>

      </div>
    </div>
  );
};
