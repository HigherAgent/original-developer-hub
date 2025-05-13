'use client';

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import type { StripeElementsOptions } from '@stripe/stripe-js';

// Make sure to add your publishable key as an environment variable
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

interface StripeProviderProps {
  children: React.ReactNode;
  options?: StripeElementsOptions;
}

export default function StripeProvider({ children, options }: StripeProviderProps) {
  // Check if we're on the server during SSR
  if (!stripePromise) {
    return <div>Loading payment system...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
