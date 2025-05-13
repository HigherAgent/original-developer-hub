'use client';

import React, { useState } from 'react';
import PayPalProvider from './PayPalProvider';
import PayPalPaymentForm from './PayPalPaymentForm';

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
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  const handleReset = () => {
    setPaymentError(null);
    setPaymentSuccess(false);
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

        <div>
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
      </div>
    </div>
  );
}
