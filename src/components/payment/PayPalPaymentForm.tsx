'use client';

import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalPaymentFormProps {
  amount: number;
  projectName: string;
  donorName?: string;
  donorEmail?: string;
  frequency: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function PayPalPaymentForm({
  amount,
  projectName,
  donorName,
  donorEmail,
  frequency,
  onSuccess,
  onError,
}: PayPalPaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // Function to create order on the server
  const createOrder = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          project: projectName,
          name: donorName || '',
          email: donorEmail || '',
          frequency,
        }),
      });

      const orderData = await response.json();
      
      if (orderData.error) {
        throw new Error(orderData.error);
      }
      
      return orderData.id;
    } catch (error: any) {
      setIsProcessing(false);
      onError?.(error.message || 'Failed to create PayPal order');
      throw error;
    }
  };

  // Function to handle successful capture
  const onApprove = async (data: any) => {
    try {
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      });

      const captureData = await response.json();
      
      if (captureData.error) {
        throw new Error(captureData.error);
      }
      
      // Payment was successful
      setIsProcessing(false);
      onSuccess?.();
      return captureData;
    } catch (error: any) {
      setIsProcessing(false);
      onError?.(error.message || 'Failed to capture PayPal payment');
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      {isProcessing && (
        <div className="flex justify-center items-center py-4">
          <svg className="animate-spin h-6 w-6 text-primary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      <PayPalButtons
        style={{ layout: 'vertical', shape: 'rect', color: 'blue' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => {
          setIsProcessing(false);
          onError?.(err.message || 'An error occurred with PayPal');
        }}
        onCancel={() => {
          setIsProcessing(false);
        }}
        disabled={isProcessing}
      />
      
      <div className="text-sm text-neutral-medium text-center">
        <p>You'll be redirected to PayPal to complete your {frequency === 'one-time' ? 'one-time' : frequency} donation of ${amount.toFixed(2)}.</p>
      </div>
    </div>
  );
}
