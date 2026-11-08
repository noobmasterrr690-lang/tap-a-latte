import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { CreditCard, Banknote, QrCode, CheckCircle, Printer, Search } from 'lucide-react';
import { DigitalReceipt } from '../common/DigitalReceipt';

export const MobileCashierView: React.FC = () => {
  const { orders, updatePaymentStatus, openReceipt, showReceiptModal, activeReceiptOrder, closeReceipt } = useApp();
  const [filterMode, setFilterMode] = useState<'pending' | 'paid'>('pending');

  const filtered = orders.filter(o => {
    if (filterMode === 'pending') return o.paymentStatus === 'pending';
    return o.paymentStatus === 'paid';
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] bg-[#FAF7F2] pb-20">
      
      {/* Sticky Header Tabs */}
      <div className="bg-white border-b border-coffee-200 p-3 sticky top-[65px] z-20 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">Cashier</span>
            <span className="text-xs font-bold font-serif text-coffee-950">Counter POS</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coffee-100 text-coffee-700">
            {filtered.length} Orders
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1 p-1 bg-coffee-100 rounded-xl text-center">
          <button
            onClick={() => setFilterMode('pending')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterMode === 'pending' ? 'bg-amber-600 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Pending Cash/QR
          </button>
          <button
            onClick={() => setFilterMode('paid')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterMode === 'paid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Paid / Settled
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-coffee-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-emerald-400" />
            <div className="text-xs font-bold text-coffee-800">No Orders Pending</div>
          </div>
        ) : (
          filtered.map((ord) => (
            <div key={ord.id} className="p-4 bg-white rounded-2xl border border-coffee-200 shadow-sm space-y-2.5">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono font-bold text-sm text-caramel">{ord.orderNumber}</span>
                  <h4 className="font-bold text-xs text-coffee-900 mt-0.5">{ord.customerName}</h4>
                  <span className="text-[10px] text-coffee-500 capitalize">{ord.orderType.replace('_', ' ')}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-base font-extrabold text-coffee-950">
                    ₱{ord.totalAmount.toFixed(2)}
                  </span>
                  <span className={`block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 ${
                    ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ord.paymentMethod} • {ord.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="text-xs text-coffee-600 bg-coffee-50 p-2.5 rounded-xl space-y-1">
                {ord.items.map((it, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{it.quantity}x {it.productName} ({it.cupSize})</span>
                    <span className="font-mono font-bold">₱{it.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => openReceipt(ord)}
                  className="py-2 px-3 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-800 text-xs font-bold flex items-center justify-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Receipt</span>
                </button>
                {ord.paymentStatus === 'pending' && (
                  <button
                    onClick={() => updatePaymentStatus(ord.id, 'paid')}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Confirm Paid</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Digital Receipt Modal */}
      {showReceiptModal && activeReceiptOrder && (
        <DigitalReceipt order={activeReceiptOrder} onClose={closeReceipt} />
      )}

    </div>
  );
};
