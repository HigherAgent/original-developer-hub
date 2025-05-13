'use client';

import React, { useState } from 'react';
import StripeProvider from './StripeProvider';
import PayPalProvider from './PayPalProvider';
import PaymentForm from './PaymentForm';
import PayPalPaymentForm from './PayPalPaymentForm';
import { StripeElementsOptions } from '@stripe/stripe-js';

interface DonationFormProps {
  selectedProject: string;
  donationAmount: number | string;
  frequency: string;
  name?: string;
  email?: string;
}

export default function DonationForm({
  selectedProject,
  donationAmount,
  frequency,
  name,
  email,
}: DonationFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret || '',
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
      },
    },
  };

  const handleCreatePaymentIntent = async () => {
    if (typeof donationAmount !== 'number' || donationAmount < 1) {
      setPaymentError('Please enter a valid donation amount');
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    try {
      const response = await fetch('/api/stripe/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            amount: donationAmount,
            currency: 'usd',
            payment_intent_data: {
              metadata: {
                project: selectedProject,
                frequency,
                name: name || '',
                email: email || '',
              },
            },
          },
        }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        setPaymentError(error);
        return;
      }

      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      setPaymentError('Failed to initialize payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const handleReset = () => {
    setClientSecret(null);
    setPaymentError(null);
    setPaymentSuccess(false);
    setPaymentMethod(null);
  };

  const handleSelectPaymentMethod = (method: 'stripe' | 'paypal') => {
    setPaymentMethod(method);
    if (method === 'stripe') {
      handleCreatePaymentIntent();
    }
  };

  // Get project name for PayPal
  const getProjectName = () => {
    switch (selectedProject) {
      case 'all':
        return 'All Projects';
      case 'pdf-made-simple':
        return 'PDF Made Simple';
      case 'developer-hub':
        return 'Developer Hub';
      default:
        return selectedProject;
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-6">
        <svg
          className="h-12 w-12 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="text-xl font-semibold mb-2 text-neutral-dark">
          Thank You for Your Support!
        </h3>
        <p className="mb-6">
          Your donation of ${typeof donationAmount === 'number' ? donationAmount.toFixed(2) : donationAmount} has been successfully processed.
          {email && ' A receipt has been sent to your email.'}
        </p>
        <button
          onClick={handleReset}
          className="btn-secondary"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  const amount = typeof donationAmount === 'number' ? donationAmount : parseFloat(donationAmount) || 0;

  return (
    <div>
      {!paymentMethod ? (
        <div className="space-y-6">
          <p className="text-neutral-medium">
            You're making a {frequency} donation of $
            {typeof donationAmount === 'number' ? donationAmount.toFixed(2) : donationAmount}{' '}
            to support{' '}
            {getProjectName()}.
          </p>

          {paymentError && (
            <div className="text-red-500 text-sm mt-2">{paymentError}</div>
          )}

          <div className="space-y-4">
            <h3 className="font-medium text-neutral-dark">Choose a payment method:</h3>
            
            <button
              onClick={() => handleSelectPaymentMethod('paypal')}
              className="w-full border border-neutral-light rounded-md py-3 px-4 flex items-center justify-center hover:bg-neutral-50 transition"
            >
              <img 
                src="/paypal-logo.png" 
                alt="PayPal" 
                className="h-6" 
                onError={(e) => {
                  // Fallback if image is not available
                  e.currentTarget.outerHTML = '<span class="font-bold text-blue-800">Pay<span class="text-blue-600">Pal</span></span>';
                }}
              />
            </button>
            
            <button
              onClick={() => handleSelectPaymentMethod('stripe')}
              className="w-full border border-neutral-light rounded-md py-3 px-4 flex items-center justify-center hover:bg-neutral-50 transition"
            >
              <span>Pay with Card</span>
            </button>
          </div>
        </div>
      ) : paymentMethod === 'stripe' && clientSecret ? (
        <div>
          <button 
            onClick={handleReset}
            className="mb-6 flex items-center text-primary-blue hover:text-blue-700"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to payment methods
          </button>
          
          <StripeProvider options={options}>
            <PaymentForm
              clientSecret={clientSecret}
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </StripeProvider>
        </div>
      ) : paymentMethod === 'paypal' ? (
        <div>
          <button 
            onClick={handleReset}
            className="mb-6 flex items-center text-primary-blue hover:text-blue-700"
          >
            <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to payment methods
          </button>
          
          <PayPalProvider>
            <PayPalPaymentForm
              amount={amount}
              projectName={getProjectName()}
              donorName={name}
              donorEmail={email}
              frequency={frequency}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </PayPalProvider>
        </div>
      ) : (
        <div className="text-center py-6">
          <svg className="animate-spin h-6 w-6 text-primary-blue mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-neutral-medium">Initializing payment...</p>
        </div>
      )}
    </div>
  );
}
