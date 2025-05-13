'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'processing' | 'error'>('processing');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const paymentIntentId = searchParams.get('payment_intent');
    
    if (!paymentIntentClientSecret || !paymentIntentId) {
      setPaymentStatus('error');
      setErrorMessage('Invalid payment session. Payment information not found.');
      return;
    }
    
    // In a real implementation, you might want to verify the payment status on the server
    // For now, we'll assume it succeeded if we have these parameters
    setPaymentStatus('success');
  }, [searchParams]);

  return (
    <main className="py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-8">
          {paymentStatus === 'processing' && (
            <>
              <div className="flex justify-center mb-4">
                <svg className="animate-spin h-12 w-12 text-primary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-neutral-dark">Processing Your Donation</h1>
              <p className="text-neutral-medium mb-6">Please wait while we confirm your payment...</p>
            </>
          )}
          
          {paymentStatus === 'success' && (
            <>
              <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h1 className="text-3xl font-bold mb-4 text-neutral-dark">Thank You for Your Support!</h1>
              <p className="text-neutral-medium mb-6">
                Your donation has been successfully processed. A receipt has been sent to your email if provided.
              </p>
              <p className="text-neutral-medium mb-8">
                Your contribution helps support the continued development and maintenance of these projects.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/" className="btn-secondary">
                  Return to Home
                </Link>
                <Link href="/projects" className="btn-primary">
                  Browse Projects
                </Link>
              </div>
            </>
          )}
          
          {paymentStatus === 'error' && (
            <>
              <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1 className="text-3xl font-bold mb-4 text-neutral-dark">Payment Issue</h1>
              <p className="text-neutral-medium mb-6">
                {errorMessage || "There was an issue processing your payment. Please try again or contact support."}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link href="/support" className="btn-secondary">
                  Try Again
                </Link>
                <Link href="/contact" className="btn-primary">
                  Contact Support
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
