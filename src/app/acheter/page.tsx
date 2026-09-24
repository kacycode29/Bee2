import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { BuyButton } from "@/components/checkout/BuyButton";
import { getPlanAmountCents, getStripeCurrency, isStripeConfigured, STRIPE_PLANS } from "@/lib/stripe";

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currency.toUpperCase() }).format(
    cents / 100
  );
}

export default function BuyPage() {
  const configured = isStripeConfigured();
  const currency = getStripeCurrency();
  const plans = (Object.keys(STRIPE_PLANS) as Array<keyof typeof STRIPE_PLANS>).map((plan) => ({
    plan,
    ...STRIPE_PLANS[plan],
    amountCents: getPlanAmountCents(plan),
  }));

  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Acheter une clé d&apos;accès</h1>
        <p className="mt-1 text-sm text-slate-500">
          Le paiement se fait via Stripe. Une fois le paiement confirmé, votre clé s&apos;affiche
          immédiatement — utilisez-la pour créer votre compte.
        </p>

        {!configured ? (
          <Card className="mt-8 text-center text-sm text-slate-500">
            Le paiement en ligne n&apos;est pas encore activé sur ce site. Contactez
            l&apos;administrateur pour obtenir une clé d&apos;accès.
          </Card>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {plans.map(({ plan, label, amountCents }) => (
              <Card key={plan}>
                <h2 className="font-semibold text-slate-900">{label}</h2>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {amountCents ? formatAmount(amountCents, currency) : "Prix à venir"}
                </p>
                <div className="mt-4">
                  {amountCents ? (
                    <BuyButton plan={plan} label={`Acheter — ${label}`} />
                  ) : (
                    <p className="text-sm text-slate-400">Cette offre n&apos;est pas encore disponible.</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-500">
          Vous avez déjà une clé ?{" "}
          <Link href="/signup" className="font-medium text-amber-600 hover:underline">
            Créer votre compte
          </Link>
        </p>
      </div>
    </div>
  );
}
