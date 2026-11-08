import React from 'react';
import { AppProvider } from './context/AppContext';
import { ResponsiveRoot } from './components/layouts/ResponsiveRoot';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <ResponsiveRoot />
    </AppProvider>
  );
};

export default App;
