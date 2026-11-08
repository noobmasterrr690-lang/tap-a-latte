import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Product, Ingredient } from '../../types';
import { TrendingUp, ShoppingCart, AlertTriangle, Users, Package, Coffee, Plus, Check, X, Shield } from 'lucide-react';

export const MobileAdminView: React.FC = () => {
  const {
    salesReport,
    products,
    ingredients,
    users,
    adminTab,
    setAdminTab,
    toggleProductAvailability,
    updateIngredientStock,
    toggleUserStatus
  } = useApp();

  const lowStock = ingredients.filter(i => i.currentStock <= i.minThreshold);

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] bg-[#FAF7F2] pb-20">
      
      {/* Sticky Mobile Admin Tabs */}
      <div className="bg-white border-b border-coffee-200/80 p-3 sticky top-[65px] z-20 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">Admin</span>
            <span className="text-xs font-bold font-serif text-coffee-950">Management Console</span>
          </div>
          {lowStock.length > 0 && (
            <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              ⚠️ {lowStock.length} Low Stock
            </span>
          )}
        </div>

        {/* Horizontal Navigation Pills */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-coffee-100 rounded-xl text-center">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              adminTab === 'dashboard' ? 'bg-coffee-900 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setAdminTab('menu')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              adminTab === 'menu' ? 'bg-coffee-900 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => setAdminTab('inventory')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              adminTab === 'inventory' ? 'bg-coffee-900 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Stock
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              adminTab === 'users' ? 'bg-coffee-900 text-white shadow-sm' : 'text-coffee-700'
            }`}
          >
            Users
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-4 space-y-4">
        
        {/* STATS */}
        {adminTab === 'dashboard' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white p-3.5 rounded-2xl border border-coffee-200 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-coffee-500 block">Today's Sales</span>
                <span className="text-xl font-extrabold text-coffee-950 font-mono">
                  ₱{salesReport.totalSales.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">● Paid settled</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-coffee-200 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-coffee-500 block">Total Orders</span>
                <span className="text-xl font-extrabold text-coffee-950 font-mono">
                  {salesReport.totalOrders}
                </span>
                <span className="text-[10px] text-coffee-500 block mt-0.5">
                  {salesReport.completedCount} completed
                </span>
              </div>
            </div>

            {/* Low stock alerts summary */}
            {lowStock.length > 0 && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Low Stock Ingredients Alert
                </div>
                <ul className="text-[11px] list-disc list-inside text-red-700">
                  {lowStock.map(i => (
                    <li key={i.id}>{i.name}: {i.currentStock} {i.unit} (Min: {i.minThreshold})</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cashless breakdown */}
            <div className="bg-white p-4 rounded-2xl border border-coffee-200 shadow-sm space-y-2 text-xs">
              <span className="font-bold text-coffee-900 block font-serif">Payment Method Split</span>
              <div className="flex justify-between text-blue-700">
                <span>GCash:</span>
                <span className="font-bold font-mono">₱{salesReport.gcashTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Maya:</span>
                <span className="font-bold font-mono">₱{salesReport.paymayaTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span>Cash Counter:</span>
                <span className="font-bold font-mono">₱{salesReport.cashTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* MENU */}
        {adminTab === 'menu' && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-coffee-700 block uppercase">
              Toggle Drink Availability
            </span>
            {products.map(p => (
              <div key={p.id} className="p-3 bg-white rounded-2xl border border-coffee-200 flex items-center justify-between gap-3 shadow-sm">
                <img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-coffee-100 flex-shrink-0" />
                <div className="flex-1 truncate">
                  <h4 className="font-bold text-xs text-coffee-950 truncate font-serif">{p.name}</h4>
                  <span className="text-xs font-extrabold text-caramel font-mono">₱{p.basePrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => toggleProductAvailability(p.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold flex-shrink-0 ${
                    p.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {p.isAvailable ? '✓ In Stock' : '✕ Sold Out'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* INVENTORY */}
        {adminTab === 'inventory' && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-coffee-700 block uppercase">
              Ingredient Stock Levels
            </span>
            {ingredients.map(ing => {
              const isLow = ing.currentStock <= ing.minThreshold;
              return (
                <div key={ing.id} className={`p-3 bg-white rounded-2xl border shadow-sm space-y-2 ${isLow ? 'border-red-300' : 'border-coffee-200'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-coffee-900 font-serif">{ing.name}</div>
                      <div className="text-[10px] text-coffee-500">Min: {ing.minThreshold} {ing.unit}</div>
                    </div>
                    <span className={`text-sm font-extrabold font-mono ${isLow ? 'text-red-600' : 'text-coffee-950'}`}>
                      {ing.currentStock} {ing.unit}
                    </span>
                  </div>
                  <div className="flex justify-end gap-1.5 pt-1 border-t border-coffee-100 text-xs">
                    <button
                      onClick={() => updateIngredientStock(ing.id, 5)}
                      className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-bold"
                    >
                      +5 Restock
                    </button>
                    <button
                      onClick={() => updateIngredientStock(ing.id, 20)}
                      className="px-2 py-1 rounded-lg bg-caramel text-white text-[11px] font-bold"
                    >
                      +20
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* USERS */}
        {adminTab === 'users' && (
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-coffee-700 block uppercase">
              Staff & System Accounts
            </span>
            {users.map(u => (
              <div key={u.id} className="p-3 bg-white rounded-2xl border border-coffee-200 flex items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="text-xs font-bold text-coffee-900">{u.name}</div>
                  <div className="text-[10px] text-coffee-500 font-mono">{u.email} • PIN: {u.pin || '—'}</div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-coffee-100 text-coffee-800 inline-block mt-1">
                    {u.role}
                  </span>
                </div>
                <button
                  onClick={() => toggleUserStatus(u.id)}
                  className={`px-2.5 py-1 rounded-xl text-[10px] font-bold ${
                    u.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {u.status === 'active' ? 'Active' : 'Disabled'}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
