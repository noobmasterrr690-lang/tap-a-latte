import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, SugarLevel, CupSize, MilkOption, Temperature, AddonOption } from '../../types';
import { X, Plus, Minus, Coffee, Sparkles, Check, Flame, Snowflake } from 'lucide-react';

export const DrinkCustomizer: React.FC = () => {
  const { customizingProduct, closeCustomizer, addToCart, addons } = useApp();

  if (!customizingProduct) return null;

  const [cupSize, setCupSize] = useState<CupSize>('Regular (12oz)');
  const [sugarLevel, setSugarLevel] = useState<SugarLevel>('50%');
  const [temperature, setTemperature] = useState<Temperature>('Iced');
  const [milkOption, setMilkOption] = useState<MilkOption>('Fresh Milk');
  const [selectedAddons, setSelectedAddons] = useState<AddonOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const getSizeDelta = (size: CupSize): number => {
    switch (size) {
      case 'Grande (22oz)': return 35;
      case 'Large (16oz)': return 20;
      case 'Regular (12oz)': default: return 0;
    }
  };

  const getMilkDelta = (milk: MilkOption): number => {
    if (milk === 'Oat Milk' || milk === 'Almond Milk') return 35;
    return 0;
  };

  const sizeDelta = getSizeDelta(cupSize);
  const milkDelta = getMilkDelta(milkOption);
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const singleItemPrice = customizingProduct.basePrice + sizeDelta + milkDelta + addonsTotal;
  const totalPrice = singleItemPrice * quantity;

  const toggleAddon = (addon: AddonOption) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddOrder = () => {
    addToCart({
      productId: customizingProduct.id,
      productName: customizingProduct.name,
      basePrice: customizingProduct.basePrice,
      cupSize,
      sizePriceDelta: sizeDelta,
      sugarLevel,
      milkOption,
      temperature,
      selectedAddons,
      quantity,
      totalPrice,
      specialInstructions: notes.trim() || undefined
    });
    closeCustomizer();
  };

  const sugarLevels: SugarLevel[] = ['0%', '25%', '50%', '75%', '100%'];
  const sizes: { size: CupSize; label: string; oz: string; extra: number }[] = [
    { size: 'Regular (12oz)', label: 'Regular', oz: '12 oz', extra: 0 },
    { size: 'Large (16oz)', label: 'Large', oz: '16 oz', extra: 20 },
    { size: 'Grande (22oz)', label: 'Grande', oz: '22 oz', extra: 35 },
  ];
  const milks: MilkOption[] = ['Fresh Milk', 'Oat Milk', 'Almond Milk'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-coffee-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] w-full sm:max-w-xl max-h-[90vh] sm:rounded-3xl rounded-t-3xl border border-coffee-200 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Product Hero */}
        <div className="relative h-44 sm:h-48 w-full bg-coffee-900 flex-shrink-0">
          <img
            src={customizingProduct.imageUrl}
            alt={customizingProduct.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent" />
          
          <button
            onClick={closeCustomizer}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-caramel text-white">
                Drink Customizer
              </span>
              <span className="text-xs text-coffee-300">Base: ₱{customizingProduct.basePrice}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight mt-1">
              {customizingProduct.name}
            </h3>
            <p className="text-xs text-coffee-200 line-clamp-1 mt-0.5">
              {customizingProduct.description}
            </p>
          </div>
        </div>

        {/* Customization Options Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-coffee-900">
          
          {/* Temperature Choice (Hot / Iced) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-coffee-700 block mb-2">
              1. Temperature Preference
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTemperature('Iced')}
                className={`py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  temperature === 'Iced'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-coffee-700 border-coffee-200 hover:border-blue-300'
                }`}
              >
                <Snowflake className="w-4 h-4" />
                Iced (Refreshing)
              </button>
              <button
                type="button"
                onClick={() => setTemperature('Hot')}
                className={`py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  temperature === 'Hot'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-white text-coffee-700 border-coffee-200 hover:border-amber-300'
                }`}
              >
                <Flame className="w-4 h-4" />
                Hot (Velvety Steamed)
              </button>
            </div>
          </div>

          {/* Cup Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-coffee-700">
                2. Select Cup Size
              </label>
              <span className="text-[11px] text-coffee-500">Pick volume</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => {
                const isSelected = cupSize === s.size;
                return (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setCupSize(s.size)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-coffee-900 text-white border-coffee-900 shadow-md ring-2 ring-caramel'
                        : 'bg-white text-coffee-800 border-coffee-200 hover:border-coffee-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.label}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-coffee-300' : 'text-coffee-500'}`}>
                      {s.oz}
                    </div>
                    <div className={`text-[11px] font-semibold mt-1 ${isSelected ? 'text-caramel-light' : 'text-caramel'}`}>
                      {s.extra === 0 ? 'Standard' : `+₱${s.extra}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sugar Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-coffee-700">
                3. Sweetness / Sugar Level
              </label>
              <span className="text-xs font-bold text-caramel">{sugarLevel} Sweetness</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {sugarLevels.map((lvl) => {
                const isSelected = sugarLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSugarLevel(lvl)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all text-center ${
                      isSelected
                        ? 'bg-caramel text-white border-caramel shadow-sm'
                        : 'bg-white text-coffee-700 border-coffee-200 hover:border-coffee-300'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milk Options */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-coffee-700 block mb-2">
              4. Dairy / Plant Milk Choice
            </label>
            <div className="grid grid-cols-3 gap-2">
              {milks.map((m) => {
                const isSelected = milkOption === m;
                const extra = getMilkDelta(m);
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMilkOption(m)}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'bg-coffee-900 text-white border-coffee-900 shadow-sm'
                        : 'bg-white text-coffee-800 border-coffee-200 hover:border-coffee-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{m}</div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-caramel-light' : 'text-caramel font-semibold'}`}>
                      {extra > 0 ? `+₱${extra}` : 'Included'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons List */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-coffee-700 block mb-2">
              5. Add-ons & Extras (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {addons.map((addon) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-caramel/15 border-caramel text-coffee-900 shadow-sm font-semibold'
                        : 'bg-white border-coffee-200 hover:border-coffee-300 text-coffee-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                        isSelected ? 'bg-caramel text-white border-caramel' : 'bg-white border-coffee-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs">{addon.name}</span>
                    </div>
                    <span className="text-xs font-bold text-caramel">+₱{addon.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Barista Instructions */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-coffee-700 block mb-1">
              Special Requests for Barista
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot, light ice, separate lid..."
              className="w-full text-xs p-3 rounded-xl bg-white border border-coffee-200 focus:outline-none focus:border-caramel text-coffee-900"
            />
          </div>

        </div>

        {/* Sticky Bottom Summary Bar */}
        <div className="p-4 bg-white border-t border-coffee-200 shadow-coffee flex items-center justify-between gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center border border-coffee-200 rounded-2xl bg-coffee-50 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl bg-white hover:bg-coffee-100 flex items-center justify-center text-coffee-800 shadow-sm active:scale-95 transition-all"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-coffee-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-white hover:bg-coffee-100 flex items-center justify-center text-coffee-800 shadow-sm active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAddOrder}
            className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-caramel to-caramel-dark hover:brightness-105 active:scale-[0.98] text-white font-bold text-sm shadow-warm flex items-center justify-between transition-all"
          >
            <span>Add to Order</span>
            <span className="font-mono text-base">₱{totalPrice.toFixed(2)}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
