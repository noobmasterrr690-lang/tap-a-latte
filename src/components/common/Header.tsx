import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useResponsive } from '../../context/useResponsive';
import { Coffee, Shield, User as UserIcon, ChefHat, CreditCard, Smartphone, Monitor, ChevronDown, RefreshCw } from 'lucide-react';
import { RoleModal } from './RoleModal';

export const Header: React.FC = () => {
  const { currentUser, dineOption, setDineOption, cartCount } = useApp();
  const { isMobile, orientation, width } = useResponsive();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRoleBadge = () => {
    switch (currentUser.role) {
      case 'admin':
        return { label: 'Admin / Owner', color: 'bg-amber-100 text-amber-900 border-amber-300', icon: Shield };
      case 'cashier':
        return { label: 'Cashier POS', color: 'bg-emerald-100 text-emerald-900 border-emerald-300', icon: CreditCard };
      case 'staff':
        return { label: 'Kitchen / Barista', color: 'bg-blue-100 text-blue-900 border-blue-300', icon: ChefHat };
      case 'customer':
      default:
        return { label: 'Customer Kiosk', color: 'bg-caramel/15 text-caramel-dark border-caramel/30', icon: Smartphone };
    }
  };

  const badge = getRoleBadge();
  const BadgeIcon = badge.icon;

  return (
    <>
      <header className="sticky top-0 z-30 bg-coffee-900 text-white shadow-coffee border-b border-coffee-800/60 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand & Local Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-caramel to-caramel-dark flex items-center justify-center shadow-warm text-white font-bold flex-shrink-0">
              <Coffee className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF7F2]">
                  Tap-a-Latte
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-caramel/25 text-caramel-light border border-caramel/40">
                  Kiosk System
                </span>
              </div>
              <p className="text-[11px] text-coffee-300 hidden sm:block">
                Kabacan, North Cotabato • Specialty Cafe
              </p>
            </div>
          </div>

          {/* Dine-In / Take-Out Switcher (for Customers) */}
          {currentUser.role === 'customer' && (
            <div className="hidden md:flex items-center bg-coffee-800 p-1 rounded-full border border-coffee-700/60 text-xs">
              <button
                onClick={() => setDineOption('dine_in')}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  dineOption === 'dine_in'
                    ? 'bg-caramel text-white shadow-sm'
                    : 'text-coffee-300 hover:text-white'
                }`}
              >
                🍽️ Dine In
              </button>
              <button
                onClick={() => setDineOption('take_out')}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  dineOption === 'take_out'
                    ? 'bg-caramel text-white shadow-sm'
                    : 'text-coffee-300 hover:text-white'
                }`}
              >
                🛍️ Take Out
              </button>
            </div>
          )}

          {/* Right Controls: Auto-Layout Indicator & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Automatic Layout Detection Badge (NO button, informative only) */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-coffee-800/80 text-[11px] text-coffee-300 border border-coffee-700/50">
              {isMobile ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-caramel-light" />
                  <span>Auto-Mobile View ({width}px)</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-caramel-light" />
                  <span>Auto-PC/Kiosk View ({width}px)</span>
                </>
              )}
            </div>

            {/* Live Clock */}
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-coffee-200">{timeStr}</div>
              <div className="text-[10px] text-coffee-400 capitalize">{orientation}</div>
            </div>

            {/* Role Access Pill & Switcher */}
            <button
              onClick={() => setShowRoleModal(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:scale-[1.02] active:scale-[0.98] ${badge.color}`}
              title="Click to switch access & test user roles"
            >
              <BadgeIcon className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{badge.label}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          </div>

        </div>
      </header>

      {/* Role Access / Authenticate Modal */}
      {showRoleModal && (
        <RoleModal onClose={() => setShowRoleModal(false)} />
      )}
    </>
  );
};
