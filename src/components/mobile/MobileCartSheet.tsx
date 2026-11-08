import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentMethod } from '../../types';
import { X, Trash2, Plus, Minus, CreditCard, Banknote, QrCode, CheckCircle, ShieldCheck } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const MobileCartSheet: React.FC<Props> = ({ onClose }) => {
  const { cart, updateCartItemQty, removeFromCart, clearCart, cartTotal, dineOption, checkoutOrder } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [customerName, setCustomerName] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [cashTendered, setCashTendered] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      checkoutOrder(
        paymentMethod,
        customerName.trim() || 'Guest Customer',
        undefined,
        referenceNumber.trim() || undefined,
        typeof cashTendered === 'number' ? cashTendered : undefined
      );
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-coffee-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] w-full max-h-[92vh] rounded-t-3xl border-t border-coffee-200 shadow-2xl flex flex-col overflow-hidden animate-slideUp">
        
        {/* Handle & Header */}
        <div className="p-4 bg-white border-b border-coffee-200 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="w-10 h-1 bg-coffee-300 rounded-full mx-auto -mt-1 mb-2 sm:hidden" />
            <h3 className="font-serif text-lg font-bold text-coffee-950 flex items-center gap-2">
              <span>☕ Your Coffee Tray</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-caramel/15 text-caramel-dark border border-caramel/30 font-sans">
                {dineOption === 'dine_in' ? 'Dine In' : 'Take Out'}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-coffee-100 hover:bg-coffee-200 flex items-center justify-center text-coffee-800 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Order Items & Payment */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          
          {/* Order Items List */}
          <div className="space-y-2.5">
            {cart.map((item) => (
              <div key={item.id} className="p-3 bg-white rounded-2xl border border-coffee-200/80 shadow-sm flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-bold text-sm text-coffee-900 font-serif">
                    {item.productName}
                  </div>
                  <div className="text-[11px] text-coffee-600 mt-0.5 space-y-0.5">
                    <div>• {item.cupSize} | {item.temperature} | {item.sugarLevel} Sugar</div>
                    {item.milkOption !== 'Fresh Milk' && (
                      <div>• Milk: <span className="font-semibold text-coffee-800">{item.milkOption}</span></div>
                    )}
                    {item.selectedAddons.length > 0 && (
                      <div>• Addons: {item.selectedAddons.map(a => a.name).join(', ')}</div>
                    )}
                    {item.specialInstructions && (
                      <div className="italic text-coffee-500">"{item.specialInstructions}"</div>
                    )}
                  </div>
                  <div className="text-xs font-extrabold text-caramel mt-1 font-mono">
                    ₱{item.totalPrice.toFixed(2)}
                  </div>
                </div>

                {/* Stepper & Trash */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center border border-coffee-200 rounded-xl bg-coffee-50 p-0.5">
                    <button
                      onClick={() => updateCartItemQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-coffee-800 shadow-sm active:scale-95"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center font-bold text-xs text-coffee-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-coffee-800 shadow-sm active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Name Input */}
          <div className="bg-white p-3.5 rounded-2xl border border-coffee-200 space-y-1.5">
            <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider block">
              Customer Name / Callout Identifier
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Maria / Table 4 / Sir Juan"
              className="w-full text-xs p-2.5 rounded-xl bg-coffee-50 border border-coffee-200 focus:outline-none focus:border-caramel text-coffee-900"
            />
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-3.5 rounded-2xl border border-coffee-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider">
                Select Payment Method
              </label>
              <span className="text-[10px] text-coffee-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Secure Checkout
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {/* GCash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('gcash')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'gcash'
                    ? 'border-blue-500 bg-blue-50/80 ring-2 ring-blue-400 text-blue-900 font-bold'
                    : 'border-coffee-200 bg-white text-coffee-700 hover:border-blue-200'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-extrabold mb-1">
                  G
                </div>
                <div className="text-[11px]">GCash</div>
                <div className="text-[9px] text-blue-600">Scan QR</div>
              </button>

              {/* PayMaya / Maya */}
              <button
                type="button"
                onClick={() => setPaymentMethod('paymaya')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'paymaya'
                    ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-400 text-emerald-900 font-bold'
                    : 'border-coffee-200 bg-white text-coffee-700 hover:border-emerald-200'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold mb-1">
                  M
                </div>
                <div className="text-[11px]">Maya</div>
                <div className="text-[9px] text-emerald-600">Scan QR</div>
              </button>

              {/* Cash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400 text-amber-900 font-bold'
                    : 'border-coffee-200 bg-white text-coffee-700 hover:border-amber-200'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center text-xs mb-1">
                  <Banknote className="w-3.5 h-3.5" />
                </div>
                <div className="text-[11px]">Cash</div>
                <div className="text-[9px] text-amber-600">Counter</div>
              </button>
            </div>

            {/* Simulated Cashless QR code display */}
            {paymentMethod !== 'cash' && (
              <div className="p-3 rounded-xl bg-coffee-50 border border-coffee-200 flex items-center gap-3 animate-fadeIn">
                <div className="w-16 h-16 bg-white p-1 rounded-lg border border-coffee-300 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <QrCode className="w-12 h-12 text-coffee-900" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-coffee-900 capitalize">
                    {paymentMethod} Official QR Code
                  </div>
                  <div className="text-[11px] text-coffee-600">
                    Tap-a-Latte Cafe • Kabacan, Cotabato
                  </div>
                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="Enter Reference Number (Optional)"
                    className="mt-1.5 w-full text-[11px] p-1.5 rounded-lg bg-white border border-coffee-300 focus:outline-none focus:border-caramel"
                  />
                </div>
              </div>
            )}

            {/* Cash instructions */}
            {paymentMethod === 'cash' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Banknote className="w-4 h-4 text-amber-700" />
                  Pay at Cashier Counter
                </div>
                <p className="text-[11px] text-amber-800">
                  Your order queue ticket will be generated immediately. Please present the ticket to the cashier to complete cash payment.
                </p>
              </div>
            )}

          </div>

          {/* Order Summary Breakdown */}
          <div className="p-3.5 bg-white rounded-2xl border border-coffee-200 space-y-1.5 text-xs text-coffee-700">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span className="font-mono">₱{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service & VAT (Inclusive):</span>
              <span className="font-mono">₱0.00</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-coffee-950 pt-1.5 border-t border-coffee-100">
              <span>Grand Total:</span>
              <span className="font-mono text-caramel text-base">₱{cartTotal.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-coffee-200 shadow-coffee flex gap-3">
          <button
            onClick={clearCart}
            className="py-3 px-4 rounded-2xl bg-coffee-100 hover:bg-coffee-200 text-coffee-700 text-xs font-bold transition-all"
          >
            Clear Tray
          </button>
          <button
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-caramel to-caramel-dark hover:brightness-105 active:scale-[0.98] text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Generating Ticket...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Confirm & Place Order (₱{cartTotal.toFixed(2)})</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
