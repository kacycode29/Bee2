import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { getStripeClient, isStripeConfigured } from "@/lib/stripe";
import { fulfillCheckoutSession } from "@/lib/stripe-fulfillment";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <PublicHeader />
      <div className="mx-auto w-full max-w-lg flex-1 px-4 py-16">{children}</div>
    </div>
  );
}

export default async function BuySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId || !isStripeConfigured()) {
    return (
      <Shell>
        <Card className="text-center">
          <p className="text-sm text-slate-500">Session de paiement introuvable.</p>
          <LinkButton href="/acheter" size="sm" className="mt-4">
            Retour
          </LinkButton>
        </Card>
      </Shell>
    );
  }

  const session = await getStripeClient()
    .checkout.sessions.retrieve(sessionId)
    .catch(() => null);

  const plan = session?.metadata?.plan;
  if (!session || session.payment_status !== "paid" || (plan !== "ANNUAL" && plan !== "LIFETIME")) {
    return (
      <Shell>
        <Card className="text-center">
          <h1 className="text-xl font-semibold text-slate-900">Paiement non confirmé</h1>
          <p className="mt-2 text-sm text-slate-500">
            Si vous venez de payer, patientez quelques instants et rafraîchissez cette page. Si le
            problème persiste, contactez le support.
          </p>
          <LinkButton href="/acheter" size="sm" className="mt-4">
            Retour
          </LinkButton>
        </Card>
      </Shell>
    );
  }

  // Fulfils immediately if the webhook hasn't landed yet — idempotent, so
  // this never creates a second key even if the webhook fires moments later.
  const license = await fulfillCheckoutSession(session.id, plan);

  return (
    <Shell>
      <Card className="text-center">
        <h1 className="text-xl font-semibold text-slate-900">Paiement confirmé</h1>
        <p className="mt-2 text-sm text-slate-500">
          Voici votre clé d&apos;accès. Notez-la précieusement : elle sert aussi de preuve
          d&apos;identité si vous oubliez votre mot de passe plus tard.
        </p>
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 font-mono text-lg font-semibold tracking-wider text-amber-900">
          {license.code}
        </p>
        <LinkButton href="/signup" className="mt-6 w-full">
          Créer mon compte avec cette clé
        </LinkButton>
        <p className="mt-4 text-xs text-slate-400">
          Vous pouvez aussi noter cette clé et l&apos;utiliser plus tard depuis{" "}
          <Link href="/signup" className="underline">
            la page d&apos;inscription
          </Link>
          .
        </p>
      </Card>
    </Shell>
  );
}
