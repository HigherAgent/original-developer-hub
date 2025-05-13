// Route segment config
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Check for required environment variables
if (!process.env.PAYPAL_CLIENT_ID) {
  throw new Error('PAYPAL_CLIENT_ID environment variable is not set');
}

if (!process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error('PAYPAL_CLIENT_SECRET environment variable is not set');
}

if (!process.env.PAYPAL_WEBHOOK_ID) {
  throw new Error('PAYPAL_WEBHOOK_ID environment variable is not set');
}

// Get access token from PayPal
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

// Verify webhook signature
async function verifyWebhookSignature(body: string, headers: any) {
  const accessToken = await getAccessToken();
  const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

  const verificationResponse = await fetch(`${apiUrl}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      auth_algo: headers['paypal-auth-algo'],
      cert_url: headers['paypal-cert-url'],
      transmission_id: headers['paypal-transmission-id'],
      transmission_sig: headers['paypal-transmission-sig'],
      transmission_time: headers['paypal-transmission-time'],
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: JSON.parse(body),
    }),
  });

  const verification = await verificationResponse.json();
  return verification.verification_status === 'SUCCESS';
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const headersList = headers();
    
    // Verify webhook signature for security
    const isVerified = await verifyWebhookSignature(body, {
      'paypal-auth-algo': headersList.get('paypal-auth-algo'),
      'paypal-cert-url': headersList.get('paypal-cert-url'),
      'paypal-transmission-id': headersList.get('paypal-transmission-id'),
      'paypal-transmission-sig': headersList.get('paypal-transmission-sig'),
      'paypal-transmission-time': headersList.get('paypal-transmission-time'),
    });

    if (!isVerified) {
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 401 }
      );
    }

    const event = JSON.parse(body);

    // Handle different webhook event types
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        // Payment was captured successfully
        console.log('Payment captured successfully:', event.resource);
        
        // Extract custom data if available
        try {
          const purchaseUnit = event.resource.purchase_units?.[0];
          const customData = purchaseUnit?.custom_id 
            ? JSON.parse(purchaseUnit.custom_id) 
            : {};
          
          console.log('Donation details:', customData);
          
          // Here you would:
          // 1. Update your database
          // 2. Send confirmation emails
          // 3. Track metrics
        } catch (error) {
          console.error('Error processing custom data:', error);
        }
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        // Payment was denied
        console.log('Payment was denied:', event.resource);
        break;

      case 'PAYMENT.CAPTURE.REFUNDED':
        // Payment was refunded
        console.log('Payment was refunded:', event.resource);
        break;
        
      // Add cases for other event types as needed
        
      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}