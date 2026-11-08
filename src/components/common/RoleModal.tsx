import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, CreditCard, ChefHat, Smartphone, X, KeyRound, Check, AlertCircle } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const RoleModal: React.FC<Props> = ({ onClose }) => {
  const { currentUser, switchRole, loginWithPin, resetDatabase } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const rolesList: { role: UserRole; title: string; subtitle: string; icon: any; pin: string; color: string }[] = [
    {
      role: 'customer',
      title: 'Customer (Self-Ordering Kiosk)',
      subtitle: 'Browse coffee menu, customize drinks, choose Dine-In/Take-Out, cashless/cash checkout, digital receipt.',
      icon: Smartphone,
      pin: 'None required',
      color: 'border-caramel/40 hover:border-caramel bg-coffee-50/50'
    },
    {
      role: 'cashier',
      title: 'Cashier (Counter POS)',
      subtitle: 'Verify pending cash payments, confirm GCash/PayMaya transactions, manage customer order queue.',
      icon: CreditCard,
      pin: '2222',
      color: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40'
    },
    {
      role: 'staff',
      title: 'Staff / Barista (Kitchen KDS)',
      subtitle: 'Kitchen display screen: Incoming orders, brewing state, ready for pickup, ingredient recipes.',
      icon: ChefHat,
      pin: '3333',
      color: 'border-blue-200 hover:border-blue-400 bg-blue-50/40'
    },
    {
      role: 'admin',
      title: 'Admin / Owner (Full Access)',
      subtitle: 'Executive dashboard, daily sales, user management (CRUD & roles), menu management & real-time inventory.',
      icon: Shield,
      pin: '1234',
      color: 'border-amber-200 hover:border-amber-400 bg-amber-50/40'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setSuccessMsg(`Switched to ${role.toUpperCase()} role`);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const ok = loginWithPin(pinInput.trim());
    if (ok) {
      setSuccessMsg('PIN verified! Switched role successfully.');
      setTimeout(() => {
        onClose();
      }, 500);
    } else {
      setErrorMsg('Invalid PIN. Use 1234 (Admin), 2222 (Cashier), 3333 (Staff)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full border border-coffee-200 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-coffee-900 text-white p-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-serif flex items-center gap-2">
              <Shield className="w-5 h-5 text-caramel-light" />
              Role Access & Persona Switcher
            </h2>
            <p className="text-xs text-coffee-300">
              Tap-a-Latte separate user pages & access control system
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-100 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              {errorMsg}
            </div>
          )}

          {/* Quick PIN login for staff/cashier/admin */}
          <form onSubmit={handlePinSubmit} className="bg-white p-4 rounded-2xl border border-coffee-200 shadow-sm flex flex-col sm:flex-row gap-2 items-center">
            <div className="flex items-center gap-2 flex-1 w-full">
              <KeyRound className="w-4 h-4 text-caramel" />
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter Staff/Admin PIN (1234, 2222, 3333)"
                className="w-full text-xs bg-transparent focus:outline-none text-coffee-900"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-coffee-800 text-white text-xs font-medium hover:bg-coffee-900 transition-all flex-shrink-0"
            >
              Verify PIN
            </button>
          </form>

          {/* Role Cards for Instant Switching / Demo */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-coffee-700 uppercase tracking-wider block">
              Direct Switch for Evaluation & Testing:
            </label>
            {rolesList.map((item) => {
              const Icon = item.icon;
              const isCurrent = currentUser.role === item.role;
              return (
                <div
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${item.color} ${
                    isCurrent ? 'ring-2 ring-caramel shadow-sm' : 'hover:shadow-md'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl flex-shrink-0 ${isCurrent ? 'bg-caramel text-white' : 'bg-white text-coffee-800 shadow-sm'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-coffee-900">
                        {item.title}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-caramel text-white">
                          Active Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-coffee-600 mt-0.5 line-clamp-2">
                      {item.subtitle}
                    </p>
                    <div className="mt-2 text-[10px] text-coffee-500 font-mono">
                      Demo Quick PIN: <span className="font-bold text-coffee-800">{item.pin}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Demo Data */}
          <div className="pt-2 border-t border-coffee-200 flex items-center justify-between text-xs text-coffee-500">
            <span>Need to start fresh?</span>
            <button
              onClick={() => {
                if (confirm('Reset sample orders and inventory to defaults?')) {
                  resetDatabase();
                  setSuccessMsg('Database reseeded with initial coffee shop data!');
                }
              }}
              className="text-caramel font-semibold hover:underline"
            >
              Reset Demo Data
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
