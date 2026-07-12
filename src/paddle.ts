import { initializePaddle, type Paddle } from '@paddle/paddle-js';

const PADDLE_CLIENT_TOKEN = import.meta.env.VITE_PADDLE_CLIENT_TOKEN || 'live_23f2ec86b3f86b393f7266ffe51';

export type PaddleCustomer = { id?: string; email?: string };

let paddleInitializationPromise: Promise<Paddle | undefined> | null = null;
// Tracks which customer (if any) the current initialization was done with,
// so we know when we need to re-initialize after the user signs in.
let initializedCustomerKey: string | null = null;

export function initializePaddleClient(pwCustomer?: PaddleCustomer) {
  if (typeof window === 'undefined') {
    return Promise.resolve(undefined);
  }

  const customerKey = pwCustomer?.id || pwCustomer?.email || null;

  // Re-initialize if we now know the customer but the existing instance
  // was created anonymously (or for a different customer). Retain relies on
  // pwCustomer being present at initialization time.
  const needsReinit = paddleInitializationPromise && customerKey && customerKey !== initializedCustomerKey;

  if (!paddleInitializationPromise || needsReinit) {
    initializedCustomerKey = customerKey;
    paddleInitializationPromise = initializePaddle({
      token: PADDLE_CLIENT_TOKEN,
      ...(pwCustomer?.id || pwCustomer?.email
        ? { pwCustomer: { id: pwCustomer.id, email: pwCustomer.email } }
        : {}),
    }).catch((error) => {
      console.error('Paddle initialization failed:', error);
      return undefined;
    });
  }

  return paddleInitializationPromise;
}

export async function openPaddleCheckout(options: {
  priceId: string;
  customerEmail?: string;
  customerId?: string;
  successUrl?: string;
}) {
  // Pass pwCustomer through so Retain can correctly associate this session
  // with the signed-in customer.
  const paddle = await initializePaddleClient({
    id: options.customerId,
    email: options.customerEmail,
  });

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

export async function openCheckout(priceId: string, userEmail?: string, userId?: string) {
  return openPaddleCheckout({
    priceId,
    customerEmail: userEmail,
    customerId: userId,
    successUrl: `${window.location.origin}/?paddle=success`,
  });
}
