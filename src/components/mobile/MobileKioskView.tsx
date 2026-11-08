import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShoppingBag, Plus, Sparkles, Coffee, Flame, Snowflake, ChevronRight } from 'lucide-react';
import { MobileCartSheet } from './MobileCartSheet';
import { DrinkCustomizer } from '../common/DrinkCustomizer';
import { DigitalReceipt } from '../common/DigitalReceipt';

export const MobileKioskView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    openCustomizer,
    cartCount,
    cartTotal,
    dineOption,
    setDineOption,
    activeReceiptOrder,
    showReceiptModal,
    closeReceipt
  } = useApp();

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter products by category and search
  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-65px)] bg-[#FAF7F2] pb-24">
      
      {/* Mobile Top Bar / Search & Dine Option */}
      <div className="bg-white border-b border-coffee-200/80 px-4 py-3 sticky top-[65px] z-20 shadow-sm space-y-2.5">
        
        {/* Dine In vs Take Out Toggle for Mobile */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-coffee-100 rounded-2xl">
          <button
            onClick={() => setDineOption('dine_in')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              dineOption === 'dine_in'
                ? 'bg-caramel text-white shadow-sm'
                : 'text-coffee-700 hover:text-coffee-950'
            }`}
          >
            <span>🍽️</span> Dine In
          </button>
          <button
            onClick={() => setDineOption('take_out')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              dineOption === 'take_out'
                ? 'bg-caramel text-white shadow-sm'
                : 'text-coffee-700 hover:text-coffee-950'
            }`}
          >
            <span>🛍️</span> Take Out
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-coffee-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lattes, frappes, cold brew, pastries..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-coffee-50 border border-coffee-200 text-xs text-coffee-900 placeholder:text-coffee-400 focus:outline-none focus:border-caramel focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-coffee-500 bg-coffee-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-coffee-900 text-white shadow-sm'
                : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
            }`}
          >
            All Items ({products.length})
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-coffee-900 text-white shadow-sm'
                    : 'bg-coffee-100 text-coffee-700 hover:bg-coffee-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

      </div>

      {/* Product List / Cards */}
      <div className="p-4 space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 px-4">
            <Coffee className="w-12 h-12 text-coffee-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-coffee-800">No coffee drinks found</h4>
            <p className="text-xs text-coffee-500 mt-1">Try searching for Spanish Latte, Matcha, or Frappe</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            return (
              <div
                key={product.id}
                className={`p-3 rounded-2xl bg-white border border-coffee-200/80 shadow-sm flex gap-3 transition-all ${
                  !product.isAvailable ? 'opacity-60 grayscale-[40%]' : 'hover:border-caramel/50'
                }`}
              >
                {/* Product Thumbnail */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-coffee-100 flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {!product.isAvailable && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-1 text-center">
                      <span className="text-[10px] font-extrabold uppercase text-white tracking-wider">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  {product.isFeatured && product.isAvailable && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-caramel text-white text-[9px] font-bold">
                      ⭐ Top
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-coffee-950 font-serif leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-coffee-600 line-clamp-2 mt-0.5 leading-relaxed">
                      {product.description}
                    </p>
                    
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[9px] font-semibold text-coffee-600 bg-coffee-50 px-1.5 py-0.5 rounded-md border border-coffee-200/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-coffee-100">
                    <div>
                      <span className="text-[10px] text-coffee-400 block -mb-0.5">Price</span>
                      <span className="text-sm font-extrabold text-caramel font-mono">
                        ₱{product.basePrice.toFixed(2)}
                      </span>
                    </div>

                    {product.isAvailable ? (
                      <button
                        onClick={() => openCustomizer(product)}
                        className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-caramel to-caramel-dark text-white text-xs font-bold shadow-warm active:scale-95 flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Order</span>
                      </button>
                    ) : (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                        Unavailable
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Bottom Bar (Appears when cart has items) */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-coffee-200/80 shadow-coffee-lg z-30 flex items-center justify-between gap-3 animate-slideUp">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-coffee-900 text-white flex items-center justify-center relative shadow-sm">
              <ShoppingBag className="w-5 h-5 text-caramel-light" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-caramel text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-coffee-500 uppercase tracking-wider font-semibold block">
                Total ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
              <span className="text-base font-extrabold text-coffee-950 font-mono">
                ₱{cartTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-caramel to-caramel-dark text-white font-bold text-xs shadow-warm flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <span>Review & Pay</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drink Customizer Modal */}
      <DrinkCustomizer />

      {/* Mobile Cart / Checkout Slide-up Sheet */}
      {isCartOpen && (
        <MobileCartSheet onClose={() => setIsCartOpen(false)} />
      )}

      {/* Digital Receipt Modal */}
      {showReceiptModal && activeReceiptOrder && (
        <DigitalReceipt order={activeReceiptOrder} onClose={closeReceipt} />
      )}

    </div>
  );
};
