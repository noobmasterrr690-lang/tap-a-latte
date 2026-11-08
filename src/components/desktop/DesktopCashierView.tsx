import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, PaymentStatus } from '../../types';
import { CreditCard, Banknote, QrCode, CheckCircle, Printer, Search, Clock, Coffee, ShieldCheck, ChevronRight } from 'lucide-react';
import { DigitalReceipt } from '../common/DigitalReceipt';

export const DesktopCashierView: React.FC = () => {
  const { orders, updatePaymentStatus, openReceipt, showReceiptModal, activeReceiptOrder, closeReceipt } = useApp();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cashTendered, setCashTendered] = useState<number | ''>('');
  const [filterMode, setFilterMode] = useState<'all' | 'pending_cash' | 'pending_cashless' | 'paid'>('pending_cash');
  const [searchQueue, setSearchQueue] = useState('');

  // Filter queue orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.orderNumber.toLowerCase().includes(searchQueue.toLowerCase()) ||
                          o.customerName.toLowerCase().includes(searchQueue.toLowerCase());
    if (!matchesSearch) return false;

    if (filterMode === 'pending_cash') return o.paymentStatus === 'pending' && o.paymentMethod === 'cash';
    if (filterMode === 'pending_cashless') return o.paymentStatus === 'pending' && o.paymentMethod !== 'cash';
    if (filterMode === 'paid') return o.paymentStatus === 'paid';
    return true;
  });

  const activeOrder = selectedOrder || filteredOrders[0] || null;

  const handleConfirmPayment = (order: Order) => {
    updatePaymentStatus(order.id, 'paid');
    setCashTendered('');
  };

  const quickBills = [100, 200, 500, 1000];

  return (
    <div className="flex h-[calc(100vh-65px)] bg-[#FAF7F2] overflow-hidden">
      
      {/* Left: Orders Queue List */}
      <aside className="w-80 lg:w-96 bg-white border-r border-coffee-200/80 flex flex-col justify-between shadow-sm flex-shrink-0">
        
        {/* Queue Header & Filters */}
        <div className="p-4 border-b border-coffee-200 space-y-3 bg-coffee-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-base font-bold text-coffee-950">
                Cashier POS Terminal
              </h2>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-coffee-200 text-coffee-800">
              {filteredOrders.length} in queue
            </span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQueue}
              onChange={(e) => setSearchQueue(e.target.value)}
              placeholder="Search by ticket # or name..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-coffee-200 text-xs text-coffee-900 focus:outline-none focus:border-caramel"
            />
          </div>

          {/* Filter Pills */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-coffee-100 rounded-xl text-center text-[10px] font-bold">
            <button
              onClick={() => setFilterMode('pending_cash')}
              className={`py-1.5 rounded-lg transition-all ${
                filterMode === 'pending_cash' ? 'bg-amber-600 text-white shadow-sm' : 'text-coffee-700'
              }`}
            >
              Cash Unpaid
            </button>
            <button
              onClick={() => setFilterMode('pending_cashless')}
              className={`py-1.5 rounded-lg transition-all ${
                filterMode === 'pending_cashless' ? 'bg-blue-600 text-white shadow-sm' : 'text-coffee-700'
              }`}
            >
              Cashless
            </button>
            <button
              onClick={() => setFilterMode('paid')}
              className={`py-1.5 rounded-lg transition-all ${
                filterMode === 'paid' ? 'bg-emerald-600 text-white shadow-sm' : 'text-coffee-700'
              }`}
            >
              Settled
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`py-1.5 rounded-lg transition-all ${
                filterMode === 'all' ? 'bg-coffee-900 text-white shadow-sm' : 'text-coffee-700'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Order Items in Queue */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-coffee-400">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
              <div className="text-xs font-bold text-coffee-700">Queue is Clear</div>
              <div className="text-[10px] text-coffee-500">No matching orders awaiting payment</div>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const isSelected = activeOrder?.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-caramel bg-coffee-50/90 ring-2 ring-caramel/40 shadow-sm'
                      : 'border-coffee-200/80 bg-white hover:border-coffee-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-caramel">
                      {ord.orderNumber}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      ord.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentMethod} • {ord.paymentStatus}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-coffee-900 mt-1">
                    {ord.customerName}
                  </div>

                  <div className="text-[11px] text-coffee-500 line-clamp-1 mt-0.5">
                    {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-coffee-100 text-xs">
                    <span className="text-coffee-400 font-mono text-[10px]">
                      {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="font-mono font-extrabold text-coffee-950">
                      ₱{ord.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Counter Info Footer */}
        <div className="p-3 border-t border-coffee-200 text-center text-[10px] text-coffee-500">
          Cashier Station #1 • Tap-a-Latte POS
        </div>
      </aside>

      {/* Right: Payment Inspection & Settlement Panel */}
      <main className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
        {activeOrder ? (
          <div className="max-w-2xl mx-auto w-full space-y-5">
            
            {/* Header Ticket Banner */}
            <div className="bg-white p-6 rounded-3xl border border-coffee-200 shadow-sm flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-coffee-500">
                  Ticket Inspector
                </span>
                <h3 className="font-serif text-2xl font-bold text-coffee-950 flex items-center gap-2 mt-0.5">
                  <span className="text-caramel font-mono">{activeOrder.orderNumber}</span>
                  <span className="text-coffee-300">•</span>
                  <span>{activeOrder.customerName}</span>
                </h3>
                <div className="flex items-center gap-2 text-xs text-coffee-600 mt-1">
                  <span>{activeOrder.orderType === 'dine_in' ? '🍽️ Dine In' : '🛍️ Take Out'}</span>
                  <span>•</span>
                  <span>Placed at {new Date(activeOrder.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>

              <button
                onClick={() => openReceipt(activeOrder)}
                className="py-2 px-3 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-800 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>View Receipt</span>
              </button>
            </div>

            {/* Items Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-coffee-200 shadow-sm space-y-3">
              <h4 className="font-serif text-sm font-bold text-coffee-950 border-b pb-2">
                Order Items & Drink Customizations
              </h4>

              <div className="space-y-2.5">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-coffee-50 border border-coffee-200/60 flex justify-between items-start text-xs">
                    <div>
                      <div className="font-bold text-coffee-900 font-serif text-sm">
                        {item.quantity}x {item.productName}
                      </div>
                      <div className="text-[11px] text-coffee-600 mt-0.5 space-y-0.5">
                        <div>• {item.cupSize} | {item.temperature} | {item.sugarLevel} Sugar</div>
                        {item.milkOption !== 'Fresh Milk' && <div>• Milk: {item.milkOption}</div>}
                        {item.selectedAddons.length > 0 && (
                          <div>• Extras: {item.selectedAddons.map(a => a.name).join(', ')}</div>
                        )}
                        {item.specialInstructions && (
                          <div className="italic text-coffee-500">"{item.specialInstructions}"</div>
                        )}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-coffee-950 text-sm">
                      ₱{item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-coffee-200 space-y-1 text-xs">
                <div className="flex justify-between text-coffee-600">
                  <span>Subtotal Amount:</span>
                  <span className="font-mono">₱{activeOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-coffee-950 pt-1">
                  <span>TOTAL DUE:</span>
                  <span className="font-mono text-caramel text-xl">₱{activeOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Settlement Card */}
            <div className="bg-white p-6 rounded-3xl border border-coffee-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold text-coffee-950">
                  Payment Verification & Tender
                </h4>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                  activeOrder.paymentStatus === 'paid'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Current: {activeOrder.paymentMethod} • {activeOrder.paymentStatus}
                </span>
              </div>

              {/* Cash Calculator if cash or settling cash */}
              {activeOrder.paymentMethod === 'cash' && activeOrder.paymentStatus === 'pending' && (
                <div className="space-y-3 p-4 bg-amber-50/70 rounded-2xl border border-amber-200">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-700" />
                    Cash Counter Change Calculator
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-amber-800 block mb-1">
                        Cash Tendered (₱)
                      </label>
                      <input
                        type="number"
                        value={cashTendered}
                        onChange={(e) => setCashTendered(parseFloat(e.target.value) || '')}
                        placeholder={`Min ₱${activeOrder.totalAmount}`}
                        className="w-full text-base font-mono font-bold p-2.5 rounded-xl border border-amber-300 bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-amber-800 block mb-1">
                        Customer Change Due
                      </label>
                      <div className="text-xl font-mono font-extrabold text-emerald-700 p-2 rounded-xl bg-white border border-amber-300">
                        ₱{typeof cashTendered === 'number' && cashTendered >= activeOrder.totalAmount
                          ? (cashTendered - activeOrder.totalAmount).toFixed(2)
                          : '0.00'}
                      </div>
                    </div>
                  </div>

                  {/* Quick bill shortcut buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-bold text-amber-800">Quick Bills:</span>
                    {quickBills.map((bill) => (
                      <button
                        key={bill}
                        onClick={() => setCashTendered(bill)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-xs font-mono font-bold text-amber-900 hover:bg-amber-100"
                      >
                        ₱{bill}
                      </button>
                    ))}
                    <button
                      onClick={() => setCashTendered(activeOrder.totalAmount)}
                      className="px-2.5 py-1 rounded-lg bg-amber-200 border border-amber-400 text-xs font-bold text-amber-900 hover:bg-amber-300"
                    >
                      Exact (₱{activeOrder.totalAmount})
                    </button>
                  </div>
                </div>
              )}

              {/* Cashless GCash/Maya Reference */}
              {activeOrder.paymentMethod !== 'cash' && (
                <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs space-y-1">
                  <div className="font-bold text-blue-900 capitalize flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-blue-600" />
                    {activeOrder.paymentMethod} Transaction Verification
                  </div>
                  <div className="text-coffee-600 font-mono text-[11px]">
                    Reference Number: <span className="font-bold text-coffee-900">{activeOrder.paymentReference || 'Unrecorded'}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {activeOrder.paymentStatus === 'pending' ? (
                  <button
                    onClick={() => handleConfirmPayment(activeOrder)}
                    className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-warm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Payment Received & Advance to Barista</span>
                  </button>
                ) : (
                  <div className="flex-1 py-3 px-4 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xs text-center border border-emerald-300 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Order is already settled and in kitchen production</span>
                  </div>
                )}
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-24 text-coffee-400">
            <CreditCard className="w-16 h-16 mx-auto mb-2 text-coffee-300" />
            <div className="text-sm font-bold text-coffee-700">Select an order from the queue</div>
            <div className="text-xs text-coffee-500">Pick an incoming customer ticket to accept payment</div>
          </div>
        )}
      </main>

      {/* Digital Receipt Modal */}
      {showReceiptModal && activeReceiptOrder && (
        <DigitalReceipt order={activeReceiptOrder} onClose={closeReceipt} />
      )}

    </div>
  );
};
