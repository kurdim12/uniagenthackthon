import Stripe from 'stripe';
import { config } from './config';

export const stripe = new Stripe(config.stripe.secretKey || '', {
  apiVersion: '2025-10-29.clover',
});

export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: 'pro' | 'enterprise',
  billingCycle: 'monthly' | 'annual'
): Promise<string> {
  const priceId = plan === 'pro' 
    ? config.stripe.priceIds.pro 
    : config.stripe.priceIds.enterprise;

  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    client_reference_id: userId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    metadata: {
      userId,
      plan,
      billingCycle,
    },
    subscription_data: {
      trial_period_days: 7,
      metadata: {
        userId,
        plan,
      },
    },
  });

  return session.url || '';
}

export async function createCustomerPortalSession(
  customerId: string
): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/account`,
  });

  return session.url;
}

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function reactivateSubscription(subscriptionId: string): Promise<void> {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

export async function getSubscriptionDetails(subscriptionId: string) {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

export async function createOrGetCustomer(
  email: string,
  name: string,
  userId: string
): Promise<string> {
  // Check if customer exists
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id;
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      userId,
    },
  });

  return customer.id;
}

export async function updatePaymentMethod(
  customerId: string,
  paymentMethodId: string
): Promise<void> {
  await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  });

  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethodId,
    },
  });
}

export async function getInvoices(customerId: string, limit: number = 10) {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });

  return invoices.data;
}

export async function getUpcomingInvoice(customerId: string) {
  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 1,
      status: 'draft',
    });
    return invoices.data[0] || null;
  } catch {
    return null;
  }
}
