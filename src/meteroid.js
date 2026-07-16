// Meteroid has no client-side checkout SDK/overlay like Paddle.js — a
// checkout session must be created server-side (it needs your secret
// Meteroid API key), which returns a hosted checkout URL that we redirect
// the browser to. There is no local fallback that fabricates success: if
// the backend call fails, we surface an error instead of granting access.

/**
 * Asks the backend to create a real Meteroid checkout session, then
 * redirects the browser to the hosted checkout page it returns.
 *
 * @param {{ priceId: string, customerEmail?: string, customerId?: string, successUrl: string }} options
 * @returns {Promise<boolean>} true if the redirect was started, false if checkout could not be opened
 */
export async function openMeteroidCheckout(options) {
  try {
    const res = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: options.priceId,
        customerEmail: options.customerEmail,
        customerId: options.customerId,
        successUrl: options.successUrl,
        cancelUrl: window.location.href,
      }),
    });

    if (!res.ok) {
      console.error('Meteroid checkout session request failed:', res.status);
      return false;
    }

    const data = await res.json();
    if (!data?.checkoutUrl) {
      console.error('Meteroid response missing checkoutUrl:', data);
      return false;
    }

    window.location.href = data.checkoutUrl;
    return true;
  } catch (error) {
    console.error('Meteroid checkout failed to open:', error);
    return false;
  }
}

export async function openCheckout(priceId, userEmail, userId) {
  return openMeteroidCheckout({
    priceId,
    customerEmail: userEmail,
    customerId: userId,
    successUrl: `${window.location.origin}/?meteroid=success`,
  });
}
