import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { generateLicenseCode } from "@/lib/license";
import { STRIPE_PLANS, type StripePlan } from "@/lib/stripe";

/**
 * Creates the license key for a paid Checkout session, or returns the
 * existing one — safe to call twice for the same session (the webhook and
 * the success page both call this, and the webhook itself can retry on a
 * non-2xx response). Idempotency is enforced by the DB, not by this
 * function's control flow: `stripeCheckoutSessionId` is unique, so a
 * second concurrent attempt for the same session hits P2002 and simply
 * falls back to reading the row the first attempt created.
 */
export async function fulfillCheckoutSession(sessionId: string, plan: StripePlan) {
  const existing = await prisma.licenseKey.findUnique({
    where: { stripeCheckoutSessionId: sessionId },
  });
  if (existing) return existing;

  const licenseType = STRIPE_PLANS[plan].licenseType;

  // Created UNUSED with no expiresAt, exactly like a seeded key — the
  // activation/signup flow is what starts the clock (sets ACTIVE +
  // expiresAt) once the buyer actually creates an account with it.
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await prisma.licenseKey.create({
        data: {
          code: generateLicenseCode(),
          type: licenseType,
          maxActivations: 2,
          notes: "Achat en ligne (Stripe)",
          stripeCheckoutSessionId: sessionId,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const target = (err.meta?.target as string[] | undefined)?.join(",") ?? "";
        if (target.includes("stripeCheckoutSessionId")) {
          const raced = await prisma.licenseKey.findUnique({
            where: { stripeCheckoutSessionId: sessionId },
          });
          if (raced) return raced;
        }
        // Otherwise it was a code collision (astronomically unlikely with
        // this alphabet) — loop and generate a fresh one.
        continue;
      }
      throw err;
    }
  }
  throw new Error("Impossible de générer une clé de licence unique après plusieurs tentatives.");
}
