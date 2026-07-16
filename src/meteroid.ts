// src/meteroid.ts
//
// Meteroid has no client-side checkout SDK like Paddle.js. Checkout sessions
// are created via a bearer-authenticated server API and return a hosted
// `checkout_url` that the browser is redirected to — there's no in-page
// overlay. So this module talks to YOUR backend (which holds the Meteroid
// API key), not to Meteroid directly.
//
// Assumes a backend route exists at POST /api/checkout-sessions that proxies
// to Meteroid's POST /api/v1/checkout-sessions and returns { checkoutUrl }.
// If you don't have that route yet, you'll need to add it.

export type MeteroidCustomer = { id?: string; email?: string };

export async function createMeteroidCheckoutSession(options: {
  planVersionId: string;
  customerId?: string;
  customerEmail?: string;
  successUrl?: string;
}): Promise<{ checkoutUrl: string } | null> {
  try {
    const response = await fetch('/api/checkout-sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan_version_id: options.planVersionId,
        customer_id: options.customerId,
        customer_email: options.customerEmail,
        success_url: options.successUrl,
      }),
    });

    if (!response.ok) {
      console.error('Meteroid checkout session creation failed:', response.status);
      return null;
    }

    const data = await response.json();
    // Expecting your backend to forward Meteroid's `session.checkout_url`
    if (!data?.checkoutUrl) {
      console.error('Meteroid checkout session response missing checkoutUrl');
      return null;
    }

    return { checkoutUrl: data.checkoutUrl };
  } catch (error) {
    console.error('Meteroid checkout session request failed:', error);
    return null;
  }
}

export async function openMeteroidCheckout(options: {
  planVersionId: string;
  customerEmail?: string;
  customerId?: string;
  successUrl?: string;
}) {
  const session = await createMeteroidCheckoutSession(options);
  if (!session) {
    return false;
  }
  // Hosted checkout page — redirect the current tab (no overlay mode exists).
  window.location.href = session.checkoutUrl;
  return true;
}

export async function openCheckout(planVersionId: string, userEmail?: string, userId?: string) {
  return openMeteroidCheckout({
    planVersionId,
    customerEmail: userEmail,
    customerId: userId,
    successUrl: `${window.location.origin}/?checkout=success`,
  });
}
