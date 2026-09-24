import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeClient, isStripeConfigured, isWebhookConfigured } from "@/lib/stripe";
import { fulfillCheckoutSession } from "@/lib/stripe-fulfillment";

/**
 * Stripe requires the exact raw request body (before any JSON parsing) to
 * verify the webhook signature, so this reads `request.text()` rather than
 * `request.json()`.
 */
export async function POST(request: Request) {
  if (!isStripeConfigured() || !isWebhookConfigured()) {
    return NextResponse.json({ error: "Webhook Stripe non configuré." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripeClient().webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const plan = session.metadata?.plan;
    if (session.payment_status === "paid" && (plan === "ANNUAL" || plan === "LIFETIME")) {
      await fulfillCheckoutSession(session.id, plan);
    }
  }

  return NextResponse.json({ received: true });
}
