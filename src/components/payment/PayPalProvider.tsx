'use client';

import React, { ReactNode } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

interface PayPalProviderProps {
  children: ReactNode;
  options?: object;
}

export default function PayPalProvider({ children, options = {} }: PayPalProviderProps) {
  // Default PayPal configuration
  const defaultOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: 'USD',
    intent: 'capture',
    ...options,
  };

  // Check if we're on the server during SSR or if the client ID is missing
  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return <div>Loading payment system...</div>;
  }

  return (
    <PayPalScriptProvider options={defaultOptions}>
      {children}
    </PayPalScriptProvider>
  );
}
