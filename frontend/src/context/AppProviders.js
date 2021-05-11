import * as React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'context/ThemeContext';
import { CurrencyProvider } from 'context/CurrencyContext';

function AppProviders({ children }) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <CurrencyProvider>{children}</CurrencyProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default AppProviders;
