import React from 'react';
import { useApp } from '../../context/AppContext';
import { MobileKioskView } from '../mobile/MobileKioskView';
import { MobileCashierView } from '../mobile/MobileCashierView';
import { MobileStaffView } from '../mobile/MobileStaffView';
import { MobileAdminView } from '../mobile/MobileAdminView';

export const MobileLayout: React.FC = () => {
  const { currentUser } = useApp();

  switch (currentUser.role) {
    case 'cashier':
      return <MobileCashierView />;
    case 'staff':
      return <MobileStaffView />;
    case 'admin':
      return <MobileAdminView />;
    case 'customer':
    default:
      return <MobileKioskView />;
  }
};
