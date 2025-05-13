import { NextResponse } from 'next/server';

// Route configuration for dynamic API route
export const dynamic = 'force-dynamic';

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
    const { amount, project, name, email, frequency } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount. Amount must be at least 1' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getAccessToken();

    // API URL based on environment
    const apiUrl = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';

    // Determine if this is a one-time or subscription payment
    if (frequency === 'one-time') {
      // Create a one-time payment order
      const response = await fetch(`${apiUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: amount.toString(),
              },
              description: `Donation to ${project}`,
              custom_id: JSON.stringify({
                project,
                name,
                email,
                frequency,
              }),
            },
          ],
          application_context: {
            brand_name: 'Developer Hub',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW',
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/support/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/support`,
          },
        }),
      });

      const orderData = await response.json();

      if (orderData.error) {
        console.error('PayPal API error:', orderData.error);
        return NextResponse.json(
          { error: 'Failed to create PayPal order' },
          { status: 500 }
        );
      }

      return NextResponse.json({ id: orderData.id });
    } else {
      // For subscriptions, we would implement PayPal subscription API here
      // This is a placeholder for future implementation
      return NextResponse.json(
        { error: 'Subscription payments are not implemented yet' },
        { status: 501 }
      );
    }
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
