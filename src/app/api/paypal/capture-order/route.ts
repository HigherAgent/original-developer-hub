import { NextResponse } from 'next/server';

// Check for required environment variables
if (!process.env.PAYPAL_CLIENT_ID) {
  throw new Error('PAYPAL_CLIENT_ID environment variable is not set');
}

if (!process.env.PAYPAL_CLIENT_SECRET) {
  throw new Error('PAYPAL_CLIENT_SECRET environment variable is not set');
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

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getAccessToken();

    // API URL based on environment
    const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

    // Capture the order payment
    const response = await fetch(`${apiUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const captureData = await response.json();

    if (captureData.error) {
      console.error('PayPal capture error:', captureData.error);
      return NextResponse.json(
        { error: 'Failed to capture PayPal payment' },
        { status: 500 }
      );
    }

    // At this point, you would typically:
    // 1. Record the successful payment in your database
    // 2. Send a confirmation email to the donor
    // 3. Update any relevant metrics or analytics

    return NextResponse.json({
      captureId: captureData.id,
      status: captureData.status,
    });
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    return NextResponse.json(
      { error: 'Failed to capture PayPal payment' },
      { status: 500 }
    );
  }
}
