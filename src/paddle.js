import { initializePaddle } from '@paddle/paddle-js';

const PADDLE_CLIENT_TOKEN = import.meta.env.VITE_PADDLE_CLIENT_TOKEN || 'live_23f2ec86b3f86b393f7266ffe51';

let paddleInitializationPromise = null;

export function initializePaddleClient() {
  if (typeof window === 'undefined') {
    return Promise.resolve(undefined);
  }

  if (!paddleInitializationPromise) {
    paddleInitializationPromise = initializePaddle({
      token: PADDLE_CLIENT_TOKEN,
    }).catch((error) => {
      console.error('Paddle initialization failed:', error);
      return undefined;
    });
  }

  return paddleInitializationPromise;
}

export async function openPaddleCheckout(options) {
  const paddle = await initializePaddleClient();

  if (!paddle?.Checkout?.open) {
    return false;
  }

  paddle.Checkout.open({
    items: [{ priceId: options.priceId, quantity: 1 }],
    ...(options.customerEmail ? { customer: { email: options.customerEmail } } : {}),
    settings: {
      displayMode: 'overlay',
      successUrl: options.successUrl,
    },
  });

  return true;
}

export async function openCheckout(priceId, userEmail, userId) {
  return openPaddleCheckout({
    priceId,
    customerEmail: userEmail,
    successUrl: `${window.location.origin}/?paddle=success`,
  });
}
