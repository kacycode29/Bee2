import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getPlanAmountCents,
  getStripeClient,
  getStripeCurrency,
  isStripeConfigured,
  STRIPE_PLANS,
} from "@/lib/stripe";
import { buildRateLimitKey, checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({ plan: z.enum(["ANNUAL", "LIFETIME"]) });

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Le paiement en ligne n'est pas encore activé sur ce site." },
      { status: 503 }
    );
  }

  const rateLimit = checkRateLimit(buildRateLimitKey(request, "checkout"), {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Trop de tentatives. Réessayez dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSec) } }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Offre invalide." }, { status: 400 });
  }

  const plan = parsed.data.plan;
  const amountCents = getPlanAmountCents(plan);
  if (!amountCents) {
    return NextResponse.json(
      { error: "Cette offre n'a pas encore de prix configuré." },
      { status: 503 }
    );
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: getStripeCurrency(),
      line_items: [
        {
          price_data: {
            currency: getStripeCurrency(),
            unit_amount: amountCents,
            product_data: { name: `Bee2 — ${STRIPE_PLANS[plan].label}` },
          },
          quantity: 1,
        },
      ],
      metadata: { plan },
      success_url: `${origin}/acheter/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/acheter`,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Impossible de démarrer le paiement." }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Impossible de démarrer le paiement." }, { status: 502 });
  }
}
