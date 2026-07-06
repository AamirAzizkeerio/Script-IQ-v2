import { initializePaddle } from '@paddle/paddle-js';

let paddleInstance = null;

export async function getPaddle() {
  if (!paddleInstance) {
    try {
      paddleInstance = await initializePaddle({
        environment: 'production',
        token: import.meta.env.VITE_PADDLE_TOKEN,
      });
    } catch (err) {
      console.error('Paddle failed to initialize:', err);
    }
  }
  return paddleInstance;
}

export async function openCheckout(priceId, userEmail, userId) {
  const paddle = await getPaddle();

  if (!paddle) {
    console.error('Paddle is not initialized. Checkout cannot open.');
    return;
  }

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: userEmail ? { email: userEmail } : undefined,
    customData: userId ? { userId } : undefined,
  });
}
