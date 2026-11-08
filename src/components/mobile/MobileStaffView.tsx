import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { ChefHat, Coffee, CheckCircle, ArrowRight } from 'lucide-react';

export const MobileStaffView: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [tab, setTab] = useState<OrderStatus>('brewing');

  const filtered = orders.filter(o => o.orderStatus === tab);

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case 'new': return 'brewing';
      case 'brewing': return 'ready';
      case 'ready': return 'completed';
      default: return null;
    }
  };

  const getActionLabel = (current: OrderStatus): string => {
    switch (current) {
      case 'new': return 'Start Brewing →';
      case 'brewing': return 'Mark as Ready for Pickup →';
      case 'ready': return 'Complete Order ✓';
      default: return 'Completed';
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] bg-[#FAF7F2] pb-20">
      
      {/* Sticky Mobile Barista Tabs */}
      <div className="bg-white border-b border-coffee-200 p-3 sticky top-[65px] z-20 shadow-sm space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">Barista</span>
            <span className="text-xs font-bold font-serif text-coffee-950">Kitchen Orders</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coffee-100 text-coffee-700">
            {filtered.length} Active
          </span>
        </div>

        <div className="grid grid-cols-4 gap-1 p-1 bg-coffee-100 rounded-xl text-center text-[10px] font-bold">
          <button
            onClick={() => setTab('new')}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'new' ? 'bg-coffee-900 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setTab('brewing')}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'brewing' ? 'bg-amber-600 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Brewing
          </button>
          <button
            onClick={() => setTab('ready')}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'ready' ? 'bg-blue-600 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`py-1.5 rounded-lg transition-all ${
              tab === 'completed' ? 'bg-emerald-600 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Done
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-coffee-400">
            <Coffee className="w-12 h-12 mx-auto mb-2 text-coffee-300" />
            <div className="text-xs font-bold text-coffee-800">No orders in this stage</div>
          </div>
        ) : (
          filtered.map((ord) => {
            const next = getNextStatus(ord.orderStatus);
            return (
              <div key={ord.id} className="p-4 bg-white rounded-2xl border border-coffee-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-extrabold text-base text-caramel">
                      {ord.orderNumber}
                    </span>
                    <h4 className="font-bold text-xs text-coffee-900 mt-0.5">{ord.customerName}</h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coffee-100 text-coffee-700">
                    {ord.orderType === 'dine_in' ? '🍽️ Dine In' : '🛍️ Take Out'}
                  </span>
                </div>

                {/* Items and Customizations */}
                <div className="space-y-1.5 text-xs">
                  {ord.items.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-coffee-50 border border-coffee-200/70">
                      <div className="font-bold text-coffee-950 font-serif text-sm">
                        {item.quantity}x {item.productName}
                      </div>
                      <div className="text-[11px] text-coffee-600 mt-1 space-y-0.5">
                        <div>• {item.cupSize} | {item.temperature} | {item.sugarLevel} Sugar</div>
                        {item.milkOption !== 'Fresh Milk' && (
                          <div className="text-emerald-700 font-bold">• Milk: {item.milkOption}</div>
                        )}
                        {item.selectedAddons.length > 0 && (
                          <div>• Extras: {item.selectedAddons.map(a => a.name).join(', ')}</div>
                        )}
                        {item.specialInstructions && (
                          <div className="text-red-600 italic">"{item.specialInstructions}"</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                {next && (
                  <button
                    onClick={() => updateOrderStatus(ord.id, next)}
                    className="w-full py-2.5 px-4 rounded-xl bg-coffee-900 hover:bg-caramel text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 active:scale-95"
                  >
                    <span>{getActionLabel(ord.orderStatus)}</span>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
