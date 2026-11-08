import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, Sparkles, Coffee, ShoppingBag, Trash2, CheckCircle, ShieldCheck, QrCode, Banknote, Minus, ChevronRight } from 'lucide-react';
import { DrinkCustomizer } from '../common/DrinkCustomizer';
import { DigitalReceipt } from '../common/DigitalReceipt';
import { PaymentMethod } from '../../types';

export const DesktopKioskView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    openCustomizer,
    cart,
    cartTotal,
    cartCount,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    dineOption,
    setDineOption,
    checkoutOrder,
    activeReceiptOrder,
    showReceiptModal,
    closeReceipt
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [cashTendered, setCashTendered] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter products by category and search
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;
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
      setCustomerName('');
      setReferenceNumber('');
      setCashTendered('');
    }, 400);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] overflow-hidden bg-[#FAF7F2]">
      
      {/* 1. Left Sidebar: Categories & Search */}
      <aside className="w-64 bg-white border-r border-coffee-200/80 p-4 flex flex-col justify-between flex-shrink-0 shadow-sm overflow-y-auto">
        <div className="space-y-4">
          
          {/* Dine In / Take Out selector */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-coffee-600 block mb-1.5">
              Dining Mode
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-coffee-100 rounded-2xl">
              <button
                onClick={() => setDineOption('dine_in')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  dineOption === 'dine_in'
                    ? 'bg-caramel text-white shadow-sm'
                    : 'text-coffee-700 hover:text-coffee-950'
                }`}
              >
                <span>🍽️</span> Dine In
              </button>
              <button
                onClick={() => setDineOption('take_out')}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  dineOption === 'take_out'
                    ? 'bg-caramel text-white shadow-sm'
                    : 'text-coffee-700 hover:text-coffee-950'
                }`}
              >
                <span>🛍️</span> Take Out
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-coffee-50 border border-coffee-200 text-xs text-coffee-900 focus:outline-none focus:border-caramel focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-coffee-500 bg-coffee-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Categories Nav */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-coffee-600 block mb-1">
              Coffee Categories
            </label>
            
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                selectedCategory === 'all'
                  ? 'bg-coffee-900 text-white shadow-sm'
                  : 'text-coffee-700 hover:bg-coffee-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Coffee className="w-4 h-4" />
                <span>All Offerings</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                selectedCategory === 'all' ? 'bg-coffee-800 text-white' : 'bg-coffee-200 text-coffee-800'
              }`}>
                {products.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-coffee-900 text-white shadow-sm'
                      : 'text-coffee-700 hover:bg-coffee-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-sm">☕</span>
                    <span className="truncate">{cat.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono flex-shrink-0 ${
                    isSelected ? 'bg-coffee-800 text-white' : 'bg-coffee-200 text-coffee-800'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Local Kiosk Footer Note */}
        <div className="pt-4 border-t border-coffee-200 text-[10px] text-coffee-500 text-center">
          Tap-a-Latte • Kabacan Branch
          <div className="text-[9px] text-coffee-400 mt-0.5">Self-Ordering Kiosk v1.0</div>
        </div>
      </aside>

      {/* 2. Center: Coffee Menu Grid */}
      <main className="flex-1 overflow-y-auto p-6 space-y-5">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-coffee-900 via-coffee-800 to-caramel-dark rounded-3xl p-6 text-white shadow-coffee relative overflow-hidden flex items-center justify-between">
          <div className="relative z-10 max-w-lg">
            <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-caramel/40 text-caramel-light border border-caramel/50 inline-block mb-2">
              Freshly Brewed in Kabacan
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Crafted Coffee, Simplified Ordering.
            </h2>
            <p className="text-xs text-coffee-200 mt-1 leading-relaxed">
              Touch any drink to customize sweetness, cup size, and premium add-ons. Choose cashless payment (GCash/Maya) or pay with cash at the counter.
            </p>
          </div>
          <div className="hidden lg:block w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
            <Coffee className="w-16 h-16 text-caramel-light" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-3xl border border-coffee-200/80 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                !product.isAvailable ? 'opacity-60 grayscale-[50%]' : 'hover:shadow-coffee hover:border-caramel/50 group'
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-44 w-full bg-coffee-100 overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {!product.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-2 text-center">
                    <span className="text-xs font-extrabold uppercase text-white tracking-widest px-3 py-1 bg-red-600 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
                {product.isFeatured && product.isAvailable && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-caramel text-white text-[10px] font-bold shadow-sm">
                    ⭐ Popular Choice
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-coffee-950 group-hover:text-caramel transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-coffee-600 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium text-coffee-600 bg-coffee-50 px-2 py-0.5 rounded-md border border-coffee-200/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-coffee-100">
                  <div>
                    <span className="text-[10px] text-coffee-400 block -mb-0.5">Base Price</span>
                    <span className="text-lg font-extrabold text-caramel font-mono">
                      ₱{product.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {product.isAvailable ? (
                    <button
                      onClick={() => openCustomizer(product)}
                      className="py-2 px-4 rounded-2xl bg-gradient-to-r from-caramel to-caramel-dark hover:brightness-105 active:scale-95 text-white font-bold text-xs shadow-warm flex items-center gap-1.5 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Customize</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200">
                      Unavailable
                    </span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

      </main>

      {/* 3. Right Sidebar: Live Kiosk Order Tray (Persistent Kiosk View) */}
      <aside className="w-80 lg:w-96 bg-white border-l border-coffee-200/80 flex flex-col justify-between shadow-coffee flex-shrink-0">
        
        {/* Tray Header */}
        <div className="p-4 border-b border-coffee-200 flex items-center justify-between bg-coffee-50/50">
          <div>
            <h3 className="font-serif text-base font-bold text-coffee-950 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-caramel" />
              <span>Current Kiosk Order</span>
            </h3>
            <span className="text-[11px] text-coffee-500">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in tray
            </span>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[11px] font-semibold text-red-600 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Tray Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-coffee-400">
              <div className="w-16 h-16 rounded-3xl bg-coffee-50 border border-coffee-200 flex items-center justify-center mb-3">
                <Coffee className="w-8 h-8 text-coffee-300" />
              </div>
              <h4 className="text-sm font-bold text-coffee-700">Your Tray is Empty</h4>
              <p className="text-xs text-coffee-500 mt-1">
                Select your favorite coffee or pastry on the left to customize and add to your order.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="p-3 bg-coffee-50/80 rounded-2xl border border-coffee-200/80 text-xs space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="font-bold text-coffee-900 font-serif text-sm">
                      {item.productName}
                    </span>
                    <div className="text-[11px] text-coffee-600 mt-0.5 space-y-0.5">
                      <div>• {item.cupSize} | {item.temperature} | {item.sugarLevel} Sugar</div>
                      {item.milkOption !== 'Fresh Milk' && <div>• Milk: {item.milkOption}</div>}
                      {item.selectedAddons.length > 0 && (
                        <div>• Extras: {item.selectedAddons.map(a => a.name).join(', ')}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-coffee-200/60">
                  <span className="font-extrabold text-caramel font-mono text-sm">
                    ₱{item.totalPrice.toFixed(2)}
                  </span>
                  
                  {/* Stepper */}
                  <div className="flex items-center border border-coffee-200 rounded-xl bg-white p-0.5">
                    <button
                      onClick={() => updateCartItemQty(item.id, -1)}
                      className="w-5 h-5 rounded-md hover:bg-coffee-100 flex items-center justify-center text-coffee-800"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-bold text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQty(item.id, 1)}
                      className="w-5 h-5 rounded-md hover:bg-coffee-100 flex items-center justify-center text-coffee-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tray Checkout Bottom Panel */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-coffee-200 space-y-3">
            
            {/* Customer Name */}
            <div>
              <label className="text-[10px] font-bold text-coffee-700 uppercase tracking-wider block mb-1">
                Customer Name / Callout
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Maria / Guest"
                className="w-full text-xs p-2 rounded-xl bg-coffee-50 border border-coffee-200 focus:outline-none focus:border-caramel"
              />
            </div>

            {/* Payment Mode Selector */}
            <div>
              <label className="text-[10px] font-bold text-coffee-700 uppercase tracking-wider block mb-1">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gcash')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    paymentMethod === 'gcash'
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-400 font-bold text-blue-900'
                      : 'border-coffee-200 text-coffee-700'
                  }`}
                >
                  <div className="text-[11px] font-bold text-blue-600">GCash</div>
                  <div className="text-[9px] text-coffee-500">QR Code</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paymaya')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    paymentMethod === 'paymaya'
                      ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400 font-bold text-emerald-900'
                      : 'border-coffee-200 text-coffee-700'
                  }`}
                >
                  <div className="text-[11px] font-bold text-emerald-600">Maya</div>
                  <div className="text-[9px] text-coffee-500">QR Code</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-400 font-bold text-amber-900'
                      : 'border-coffee-200 text-coffee-700'
                  }`}
                >
                  <div className="text-[11px] font-bold text-amber-600">Cash</div>
                  <div className="text-[9px] text-coffee-500">Counter</div>
                </button>
              </div>
            </div>

            {/* Total Amount & Action */}
            <div className="pt-2 border-t border-coffee-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-coffee-500 uppercase font-bold block">Grand Total</span>
                <span className="text-xl font-extrabold text-caramel font-mono">
                  ₱{cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="py-3 px-5 rounded-2xl bg-gradient-to-r from-caramel to-caramel-dark hover:brightness-105 active:scale-95 text-white font-bold text-xs shadow-warm flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Printing Ticket...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Place Order</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </aside>

      {/* Drink Customizer Modal */}
      <DrinkCustomizer />

      {/* Digital Receipt Modal */}
      {showReceiptModal && activeReceiptOrder && (
        <DigitalReceipt order={activeReceiptOrder} onClose={closeReceipt} />
      )}

    </div>
  );
};
