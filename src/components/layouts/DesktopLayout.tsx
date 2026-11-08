import React from 'react';
import { useApp } from '../../context/AppContext';
import { DesktopKioskView } from '../desktop/DesktopKioskView';
import { DesktopCashierView } from '../desktop/DesktopCashierView';
import { DesktopStaffView } from '../desktop/DesktopStaffView';
import { DesktopAdminView } from '../desktop/DesktopAdminView';

export const DesktopLayout: React.FC = () => {
  const { currentUser } = useApp();

  switch (currentUser.role) {
    case 'cashier':
      return <DesktopCashierView />;
    case 'staff':
      return <DesktopStaffView />;
    case 'admin':
      return <DesktopAdminView />;
    case 'customer':
    default:
      return <DesktopKioskView />;
  }
};
