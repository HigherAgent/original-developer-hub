'use client';

import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalTest() {
  const [clientId, setClientId] = useState<string>("");
  const [apiUrl, setApiUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  useEffect(() => {
    // Log environment variables to verify they're loaded
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    console.log("PayPal Client ID:", paypalClientId);
    console.log("Site URL:", siteUrl);
    setClientId(paypalClientId);
  }, []);

  // Function to create order directly (bypassing our API for testing)
  const createOrder = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Creating PayPal order...");
      const response = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 5,
          project: "Test Project",
          name: "Test User",
          email: "test@example.com",
          frequency: "one-time",
        }),
      });
      
      console.log("API Response status:", response.status);
      const orderData = await response.json();
      console.log("API Response data:", orderData);
      
      if (orderData.error) {
        throw new Error(orderData.error);
      }
      
      return orderData.id;
    } catch (error: any) {
      console.error("Create order error:", error);
      setError(error.message || 'Failed to create order');
      setIsLoading(false);
      throw error;
    }
  };

  // Function to handle successful capture
  const onApprove = async (data: any) => {
    try {
      console.log("Order approved:", data);
      const response = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      });
      
      console.log("Capture response status:", response.status);
      const captureData = await response.json();
      console.log("Capture response data:", captureData);
      
      if (captureData.error) {
        throw new Error(captureData.error);
      }
      
      setIsLoading(false);
      setSuccessMessage(`Payment completed successfully! Capture ID: ${captureData.captureId}`);
      return captureData;
    } catch (error: any) {
      console.error("Capture error:", error);
      setError(error.message || 'Failed to capture payment');
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">PayPal Test Page</h1>
      
      {error && (
        <div className="bg-red-100 p-4 rounded-lg mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 p-4 rounded-lg mb-6">
          <p className="text-green-600">{successMessage}</p>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center py-4 mb-6">
          <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="ml-2">Processing...</span>
        </div>
      )}
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
          <p className="mb-2">PayPal Client ID: <span className="font-mono">{clientId ? 'Loaded ✓' : 'Not found ✗'}</span></p>
          <p>Site URL: <span className="font-mono">{process.env.NEXT_PUBLIC_SITE_URL || 'Not found ✗'}</span></p>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">Test PayPal Payment ($5.00)</h2>
        
        {clientId ? (
          <PayPalScriptProvider options={{ 
            "client-id": clientId,
            currency: "USD"
          }}>
            <PayPalButtons 
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={(err) => {
                console.error("PayPal Error:", err);
                setError(`PayPal Error: ${err.message || JSON.stringify(err)}`);
                setIsLoading(false);
              }}
              onCancel={() => {
                console.log("Payment cancelled");
                setError("Payment was cancelled");
                setIsLoading(false);
              }}
            />
          </PayPalScriptProvider>
        ) : (
          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-700">
              PayPal Client ID is missing. Please check your environment variables in Vercel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
