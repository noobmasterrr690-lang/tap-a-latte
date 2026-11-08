import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Product, Ingredient, UserRole } from '../../types';
import {
  TrendingUp, ShoppingCart, AlertTriangle, Users, Package, Coffee, Plus,
  Edit2, Trash2, Check, X, Shield, RefreshCw, DollarSign, Clock, Search, Eye, Power
} from 'lucide-react';

export const DesktopAdminView: React.FC = () => {
  const {
    salesReport,
    orders,
    products,
    ingredients,
    users,
    addons,
    adminTab,
    setAdminTab,
    saveProduct,
    deleteProduct,
    toggleProductAvailability,
    saveIngredient,
    updateIngredientStock,
    saveUser,
    toggleUserStatus,
    deleteUser,
    resetDatabase
  } = useApp();

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [stockDelta, setStockDelta] = useState<number>(0);

  // Search filter
  const [adminSearch, setAdminSearch] = useState('');

  // Low stock ingredients list
  const lowStockIngredients = ingredients.filter(i => i.currentStock <= i.minThreshold);

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-[#FAF7F2] overflow-hidden">
      
      {/* Top Admin Sub-navigation */}
      <div className="bg-white border-b border-coffee-200/80 px-6 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-coffee-950">
              Admin & Owner Management Console
            </h2>
            <p className="text-xs text-coffee-600">
              Tap-a-Latte • System Administration & Telemetry
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-coffee-100 rounded-2xl">
          <button
            onClick={() => setAdminTab('dashboard')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              adminTab === 'dashboard'
                ? 'bg-coffee-900 text-white shadow-sm'
                : 'text-coffee-700 hover:text-coffee-950'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-caramel-light" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setAdminTab('menu')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              adminTab === 'menu'
                ? 'bg-coffee-900 text-white shadow-sm'
                : 'text-coffee-700 hover:text-coffee-950'
            }`}
          >
            <Coffee className="w-4 h-4 text-caramel-light" />
            <span>Menu & Pricing</span>
          </button>

          <button
            onClick={() => setAdminTab('inventory')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 relative ${
              adminTab === 'inventory'
                ? 'bg-coffee-900 text-white shadow-sm'
                : 'text-coffee-700 hover:text-coffee-950'
            }`}
          >
            <Package className="w-4 h-4 text-caramel-light" />
            <span>Ingredient Inventory</span>
            {lowStockIngredients.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              adminTab === 'users'
                ? 'bg-coffee-900 text-white shadow-sm'
                : 'text-coffee-700 hover:text-coffee-950'
            }`}
          >
            <Users className="w-4 h-4 text-caramel-light" />
            <span>User Management</span>
          </button>
        </div>

      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* ================= TAB 1: DASHBOARD ================= */}
        {adminTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Low Stock Alert Banner (Module 1 requirement) */}
            {lowStockIngredients.length > 0 && (
              <div className="p-4 rounded-3xl bg-red-50 border border-red-200 shadow-sm flex items-start justify-between gap-3 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-red-100 text-red-600 mt-0.5">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-900">
                      Low Stock Alerts ({lowStockIngredients.length} ingredients below minimum threshold)
                    </h4>
                    <p className="text-xs text-red-700 mt-0.5">
                      Immediate restock advised for: {lowStockIngredients.map(i => `${i.name} (${i.currentStock} ${i.unit} left)`).join(', ')}.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAdminTab('inventory')}
                  className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex-shrink-0 transition-all"
                >
                  Inspect Inventory
                </button>
              </div>
            )}

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Daily Sales */}
              <div className="bg-white p-5 rounded-3xl border border-coffee-200/80 shadow-sm">
                <div className="flex items-center justify-between text-coffee-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Today's Sales</span>
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-coffee-950 font-mono">
                  ₱{salesReport.totalSales.toFixed(2)}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <span>● Paid & Settled Revenue</span>
                </div>
              </div>

              {/* Total Orders */}
              <div className="bg-white p-5 rounded-3xl border border-coffee-200/80 shadow-sm">
                <div className="flex items-center justify-between text-coffee-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-coffee-950 font-mono">
                  {salesReport.totalOrders}
                </div>
                <div className="text-[11px] text-coffee-500 mt-1">
                  {salesReport.completedCount} completed • {salesReport.pendingCount} in queue
                </div>
              </div>

              {/* Average Order Value (AOV) */}
              <div className="bg-white p-5 rounded-3xl border border-coffee-200/80 shadow-sm">
                <div className="flex items-center justify-between text-coffee-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Average Ticket</span>
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-coffee-950 font-mono">
                  ₱{salesReport.averageOrderValue.toFixed(2)}
                </div>
                <div className="text-[11px] text-purple-600 font-semibold mt-1">
                  Avg. per paying customer
                </div>
              </div>

              {/* Payment Split */}
              <div className="bg-white p-5 rounded-3xl border border-coffee-200/80 shadow-sm">
                <div className="flex items-center justify-between text-coffee-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Cashless Adoption</span>
                  <div className="p-2 rounded-xl bg-caramel/15 text-caramel">
                    <Coffee className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-blue-600 font-sans">GCash:</span>
                    <span className="font-bold">₱{salesReport.gcashTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-600 font-sans">Maya:</span>
                    <span className="font-bold">₱{salesReport.paymayaTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600 font-sans">Cash:</span>
                    <span className="font-bold">₱{salesReport.cashTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Orders Feed */}
            <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-coffee-200 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-coffee-950">
                    Recent Customer Orders
                  </h3>
                  <p className="text-xs text-coffee-500">Live order queue from self-ordering kiosk</p>
                </div>
                <span className="text-xs font-bold text-caramel bg-coffee-50 px-3 py-1 rounded-full border border-coffee-200">
                  {orders.length} total orders recorded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-coffee-50/60 text-coffee-600 uppercase text-[10px] tracking-wider border-b border-coffee-200">
                    <tr>
                      <th className="py-3 px-4">Ticket</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Order Status</th>
                      <th className="py-3 px-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-coffee-100 text-coffee-800">
                    {orders.slice(0, 8).map((ord) => (
                      <tr key={ord.id} className="hover:bg-coffee-50/40 transition-colors">
                        <td className="py-3 px-4 font-bold font-mono text-caramel">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-4 font-semibold text-coffee-900">
                          {ord.customerName}
                          <span className="text-[10px] text-coffee-500 block font-normal capitalize">
                            {ord.orderType.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {ord.items.map(i => `${i.quantity}x ${i.productName}`).join(', ')}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold">
                          ₱{ord.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.paymentStatus === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ord.paymentMethod} • {ord.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                            ord.orderStatus === 'completed'
                              ? 'bg-gray-100 text-gray-700'
                              : ord.orderStatus === 'ready'
                              ? 'bg-blue-100 text-blue-800'
                              : ord.orderStatus === 'brewing'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-coffee-500 font-mono text-[11px]">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: MENU & PRICING MANAGEMENT ================= */}
        {adminTab === 'menu' && (
          <div className="space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-coffee-950">
                  Menu Items & Pricing Configuration
                </h3>
                <p className="text-xs text-coffee-600">
                  Add, edit, remove items, set availability, and manage add-ons
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct({
                    id: `prod-${Date.now()}`,
                    name: '',
                    categoryId: 'cat-espresso',
                    description: '',
                    basePrice: 120,
                    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
                    isAvailable: true,
                    allowsCustomization: true,
                    tags: ['New Offering']
                  });
                  setIsNewProduct(true);
                }}
                className="py-2.5 px-4 rounded-2xl bg-caramel hover:bg-caramel-dark text-white font-bold text-xs shadow-warm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Menu Item</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-coffee-50 text-coffee-600 uppercase text-[10px] tracking-wider border-b border-coffee-200">
                  <tr>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Base Price</th>
                    <th className="py-3 px-4">Availability</th>
                    <th className="py-3 px-4">Customizable</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-coffee-100 text-coffee-800">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-coffee-50/40 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover bg-coffee-100"
                        />
                        <div>
                          <div className="font-bold text-coffee-950 font-serif text-sm">{prod.name}</div>
                          <div className="text-[11px] text-coffee-500 line-clamp-1">{prod.description}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-coffee-700 capitalize">
                        {prod.categoryId.replace('cat-', '')}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-caramel text-sm">
                        ₱{prod.basePrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleProductAvailability(prod.id)}
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                            prod.isAvailable
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        >
                          {prod.isAvailable ? '✓ Available' : '✕ Out of Stock'}
                        </button>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] font-medium text-coffee-600">
                          {prod.allowsCustomization ? 'Yes (Sugar, Size, Addons)' : 'No (Fixed item)'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setIsNewProduct(false);
                          }}
                          className="p-1.5 rounded-lg bg-coffee-100 hover:bg-coffee-200 text-coffee-800 transition-all"
                          title="Edit Item"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete menu item "${prod.name}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                          title="Delete Item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Addons List Reference */}
            <div className="bg-white p-5 rounded-3xl border border-coffee-200/80 shadow-sm space-y-3">
              <h4 className="font-serif text-sm font-bold text-coffee-950">
                Active Add-On Options (Customizer Extras)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {addons.map(a => (
                  <div key={a.id} className="p-2.5 rounded-xl bg-coffee-50 border border-coffee-200 flex justify-between items-center text-xs">
                    <span className="font-semibold text-coffee-800">{a.name}</span>
                    <span className="font-mono font-bold text-caramel">+₱{a.price}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: INGREDIENT INVENTORY ================= */}
        {adminTab === 'inventory' && (
          <div className="space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-coffee-950">
                  Real-Time Ingredient Inventory Tracker
                </h3>
                <p className="text-xs text-coffee-600">
                  Monitor beans, milk, syrups, cups, and trigger restock orders
                </p>
              </div>
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients.map((ing) => {
                const isLow = ing.currentStock <= ing.minThreshold;
                const percentage = Math.min(100, Math.round((ing.currentStock / (ing.minThreshold * 2.5)) * 100));

                return (
                  <div
                    key={ing.id}
                    className={`p-4 rounded-3xl bg-white border transition-all ${
                      isLow ? 'border-red-300 shadow-sm' : 'border-coffee-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isLow ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isLow ? '⚠️ LOW STOCK' : 'HEALTHY'}
                        </span>
                        <h4 className="font-serif font-bold text-coffee-950 text-sm mt-1.5">
                          {ing.name}
                        </h4>
                        <div className="text-[11px] text-coffee-500">
                          Min threshold: {ing.minThreshold} {ing.unit}
                        </div>
                      </div>

                      <div className="text-right font-mono">
                        <div className={`text-xl font-extrabold ${isLow ? 'text-red-600' : 'text-coffee-950'}`}>
                          {ing.currentStock} <span className="text-xs font-normal">{ing.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stock Level Progress Bar */}
                    <div className="mt-3 w-full bg-coffee-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isLow ? 'bg-red-500' : 'bg-caramel'
                        }`}
                        style={{ width: `${Math.max(5, percentage)}%` }}
                      />
                    </div>

                    {/* Quick Restock Adjusters */}
                    <div className="mt-3 pt-3 border-t border-coffee-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-coffee-500">Quick Adjust:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateIngredientStock(ing.id, -1)}
                          className="px-2 py-1 rounded-lg bg-coffee-100 hover:bg-coffee-200 text-coffee-800 font-bold active:scale-95"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => updateIngredientStock(ing.id, 5)}
                          className="px-2 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold active:scale-95"
                        >
                          +5 Restock
                        </button>
                        <button
                          onClick={() => updateIngredientStock(ing.id, 20)}
                          className="px-2 py-1 rounded-lg bg-caramel hover:bg-caramel-dark text-white font-bold active:scale-95"
                        >
                          +20
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ================= TAB 4: USER MANAGEMENT ================= */}
        {adminTab === 'users' && (
          <div className="space-y-5">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-coffee-950">
                  User Accounts & Role Permissions
                </h3>
                <p className="text-xs text-coffee-600">
                  Register users, assign roles (Admin, Cashier, Staff, Customer), and deactivate accounts
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingUser({
                    id: `user-${Date.now()}`,
                    name: '',
                    email: '',
                    role: 'staff',
                    pin: '4444',
                    status: 'active',
                    createdAt: new Date().toISOString()
                  });
                  setIsNewUser(true);
                }}
                className="py-2.5 px-4 rounded-2xl bg-caramel hover:bg-caramel-dark text-white font-bold text-xs shadow-warm flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Register New User</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-coffee-200/80 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-coffee-50 text-coffee-600 uppercase text-[10px] tracking-wider border-b border-coffee-200">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Quick PIN</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-coffee-100 text-coffee-800">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-coffee-50/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-coffee-950 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-caramel/20 text-caramel flex items-center justify-center font-bold">
                          {u.name.charAt(0)}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="py-3 px-4 text-coffee-600 font-mono text-[11px]">
                        {u.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'admin'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : u.role === 'cashier'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : u.role === 'staff'
                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                            : 'bg-coffee-100 text-coffee-800 border border-coffee-300'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-coffee-700">
                        {u.pin || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                            u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {u.status === 'active' ? '● Active' : '○ Deactivated'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingUser(u);
                            setIsNewUser(false);
                          }}
                          className="p-1.5 rounded-lg bg-coffee-100 hover:bg-coffee-200 text-coffee-800 transition-all"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => {
                              if (confirm(`Remove user ${u.name}?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* Edit / New Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-coffee-950">
                {isNewProduct ? 'Add Menu Item' : 'Edit Menu Item'}
              </h3>
              <button onClick={() => setEditingProduct(null)}>
                <X className="w-4 h-4 text-coffee-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-coffee-700 block mb-1">Item Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel"
                />
              </div>

              <div>
                <label className="font-bold text-coffee-700 block mb-1">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-coffee-700 block mb-1">Base Price (₱)</label>
                  <input
                    type="number"
                    value={editingProduct.basePrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, basePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-coffee-700 block mb-1">Category</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel"
                  >
                    <option value="cat-espresso">Espresso & Classics</option>
                    <option value="cat-lattes">Signature Lattes</option>
                    <option value="cat-coldbrew">Cold Brew & Iced</option>
                    <option value="cat-frappes">Blended Frappes</option>
                    <option value="cat-noncoffee">Non-Coffee & Matcha</option>
                    <option value="cat-pastries">Pastries & Bakes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-coffee-700 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  className="w-full p-2 rounded-xl border border-coffee-200 bg-coffee-50 text-[11px] font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => setEditingProduct(null)}
                className="flex-1 py-2 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveProduct(editingProduct);
                  setEditingProduct(null);
                }}
                className="flex-1 py-2 rounded-xl bg-caramel hover:bg-caramel-dark text-white text-xs font-bold"
              >
                Save Menu Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Register User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-lg font-bold text-coffee-950">
                {isNewUser ? 'Register New User' : 'Edit User Profile'}
              </h3>
              <button onClick={() => setEditingUser(null)}>
                <X className="w-4 h-4 text-coffee-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-coffee-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  placeholder="e.g. Maria Santos"
                  className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel"
                />
              </div>

              <div>
                <label className="font-bold text-coffee-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  placeholder="user@tapalatte.ph"
                  className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-coffee-700 block mb-1">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel"
                  >
                    <option value="customer">Customer</option>
                    <option value="cashier">Cashier</option>
                    <option value="staff">Staff / Barista</option>
                    <option value="admin">Admin / Owner</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-coffee-700 block mb-1">Quick PIN (4 digits)</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={editingUser.pin || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, pin: e.target.value })}
                    placeholder="1234"
                    className="w-full p-2.5 rounded-xl border border-coffee-200 bg-coffee-50 focus:outline-none focus:border-caramel font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 py-2 rounded-xl bg-coffee-100 hover:bg-coffee-200 text-coffee-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  saveUser(editingUser);
                  setEditingUser(null);
                }}
                className="flex-1 py-2 rounded-xl bg-caramel hover:bg-caramel-dark text-white text-xs font-bold"
              >
                Save User Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
