import React from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderStatus } from '../../types';
import { ChefHat, Clock, Coffee, CheckCircle, Flame, ArrowRight, Check } from 'lucide-react';

export const DesktopStaffView: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();

  // Columns for Kitchen Display System
  const columns: { status: OrderStatus; title: string; color: string; badgeColor: string }[] = [
    { status: 'new', title: '1. Incoming / New', color: 'border-yellow-300 bg-yellow-50/30', badgeColor: 'bg-yellow-100 text-yellow-900' },
    { status: 'brewing', title: '2. Brewing & Steaming', color: 'border-amber-300 bg-amber-50/30', badgeColor: 'bg-amber-100 text-amber-900' },
    { status: 'ready', title: '3. Ready for Counter Pickup', color: 'border-blue-300 bg-blue-50/30', badgeColor: 'bg-blue-100 text-blue-900' },
    { status: 'completed', title: '4. Completed / Served', color: 'border-emerald-300 bg-emerald-50/30', badgeColor: 'bg-emerald-100 text-emerald-900' },
  ];

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
      case 'brewing': return 'Mark as Ready →';
      case 'ready': return 'Complete Order ✓';
      default: return 'Done';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-[#FAF7F2] overflow-hidden">
      
      {/* Top KDS Header */}
      <div className="bg-white border-b border-coffee-200/80 px-6 py-3.5 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-900 border border-blue-300">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-coffee-950 flex items-center gap-2">
              <span>Barista Kitchen Display System (KDS)</span>
              <span className="text-xs font-sans px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Live Kitchen Sync
              </span>
            </h2>
            <p className="text-xs text-coffee-600">
              Real-time drink preparation pipeline • Tap-a-Latte Barista Station
            </p>
          </div>
        </div>

        <div className="text-xs text-coffee-600 flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            {orders.filter(o => o.orderStatus === 'brewing').length} Drinks Currently Brewing
          </span>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="flex-1 overflow-x-auto p-6 grid grid-cols-4 gap-4">
        {columns.map((col) => {
          const colOrders = orders.filter(o => o.orderStatus === col.status);
          return (
            <div
              key={col.status}
              className={`flex flex-col rounded-3xl border ${col.color} bg-white shadow-sm overflow-hidden`}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-coffee-200/80 flex items-center justify-between bg-coffee-50/50">
                <span className="text-xs font-bold text-coffee-950 uppercase tracking-wider">
                  {col.title}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${col.badgeColor}`}>
                  {colOrders.length}
                </span>
              </div>

              {/* Column Orders List */}
              <div className="p-3 overflow-y-auto space-y-3 flex-1">
                {colOrders.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-coffee-300">
                    <Coffee className="w-8 h-8 mx-auto mb-1 opacity-50" />
                    <span className="text-xs">No orders</span>
                  </div>
                ) : (
                  colOrders.map((ord) => {
                    const next = getNextStatus(ord.orderStatus);
                    return (
                      <div
                        key={ord.id}
                        className="p-3.5 rounded-2xl bg-white border border-coffee-200/90 shadow-sm space-y-2.5 hover:shadow-coffee transition-all"
                      >
                        {/* Ticket & Customer */}
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono font-extrabold text-base text-caramel">
                              {ord.orderNumber}
                            </span>
                            <div className="text-xs font-bold text-coffee-950">
                              {ord.customerName}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coffee-100 text-coffee-800">
                            {ord.orderType === 'dine_in' ? '🍽️ Dine In' : '🛍️ Take Out'}
                          </span>
                        </div>

                        {/* Item Recipes */}
                        <div className="space-y-1.5 text-xs">
                          {ord.items.map((item, i) => (
                            <div key={i} className="p-2 rounded-xl bg-coffee-50/80 border border-coffee-200/60">
                              <div className="font-bold text-coffee-900">
                                {item.quantity}x {item.productName}
                              </div>
                              <div className="text-[11px] text-coffee-600 mt-0.5 font-medium space-y-0.5">
                                <span className="inline-block px-1.5 py-0.2 rounded bg-white border border-coffee-200 text-[10px] mr-1">
                                  {item.cupSize}
                                </span>
                                <span className="inline-block px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] mr-1">
                                  {item.temperature}
                                </span>
                                <span className="inline-block px-1.5 py-0.2 rounded bg-caramel/15 text-caramel-dark text-[10px] mr-1">
                                  {item.sugarLevel} Sugar
                                </span>
                                {item.milkOption !== 'Fresh Milk' && (
                                  <div className="text-[10px] text-emerald-700 font-bold">
                                    • {item.milkOption}
                                  </div>
                                )}
                                {item.selectedAddons.length > 0 && (
                                  <div className="text-[10px] text-coffee-600">
                                    • Add: {item.selectedAddons.map(a => a.name).join(', ')}
                                  </div>
                                )}
                                {item.specialInstructions && (
                                  <div className="text-[10px] text-red-600 italic">
                                    Note: "{item.specialInstructions}"
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom Advance Action */}
                        {next && (
                          <button
                            onClick={() => updateOrderStatus(ord.id, next)}
                            className="w-full py-2 px-3 rounded-xl bg-coffee-900 hover:bg-caramel text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 active:scale-95"
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
        })}
      </div>

    </div>
  );
};
