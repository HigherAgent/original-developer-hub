export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const { amount, currency = 'usd', payment_intent_data } = data;

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount. Amount must be at least 1' },
        { status: 400 }
      );
    }

    // Convert amount to cents/smallest currency unit
    const amountInCents = Math.round(amount * 100);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      ...payment_intent_data,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
