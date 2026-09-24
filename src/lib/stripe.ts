import Stripe from "stripe";
import type { LicenseType } from "@prisma/client";

export type StripePlan = "ANNUAL" | "LIFETIME";

export const STRIPE_PLANS: Record<
  StripePlan,
  { label: string; licenseType: LicenseType; envPriceCentsVar: string }
> = {
  ANNUAL: {
    label: "Licence annuelle",
    licenseType: "ANNUAL",
    envPriceCentsVar: "STRIPE_PRICE_ANNUAL_CENTS",
  },
  LIFETIME: {
    label: "Licence à vie",
    licenseType: "LIFETIME",
    envPriceCentsVar: "STRIPE_PRICE_LIFETIME_CENTS",
  },
};

/**
 * Everything here is opt-in: the app runs (and builds) perfectly well with
 * none of these env vars set — /acheter just shows a "not available yet"
 * message and the checkout/webhook routes return a clear 503 instead of
 * crashing. Nothing else in the app depends on Stripe being configured.
 */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function isWebhookConfigured(): boolean {
  return Boolean(process.env.STRIPE_WEBHOOK_SECRET);
}

let cached: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY n'est pas configuré.");
  }
  if (!cached) {
    cached = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return cached;
}

/** Amount in the smallest currency unit (e.g. cents), read from env — no price is ever hardcoded. */
export function getPlanAmountCents(plan: StripePlan): number | null {
  const raw = process.env[STRIPE_PLANS[plan].envPriceCentsVar];
  if (!raw) return null;
  const amount = Number(raw);
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : null;
}

export function getStripeCurrency(): string {
  return (process.env.STRIPE_CURRENCY ?? "usd").toLowerCase();
}
