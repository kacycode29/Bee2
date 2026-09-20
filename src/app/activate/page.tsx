import { requireUser } from "@/lib/session";
import { getFreshLicenseStatus } from "@/lib/license";
import { Card } from "@/components/ui/Card";
import { ActivateForm } from "@/components/activate/ActivateForm";
import { MinimalHeader } from "@/components/layout/MinimalHeader";

const REASON_MESSAGES: Record<string, string> = {
  NONE: "Votre compte n'a pas encore de licence active.",
  UNUSED: "Cette clé n'a pas encore été activée.",
  REVOKED: "Votre licence a été révoquée. Contactez votre administrateur.",
  EXPIRED: "Votre licence a expiré. Activez une nouvelle clé pour continuer.",
};

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const user = await requireUser();
  const { reason } = await searchParams;
  const { check } = await getFreshLicenseStatus(user.id);

  return (
    <div className="flex flex-1 flex-col">
      <MinimalHeader />
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
        <Card className="w-full max-w-sm">
          <h1 className="text-xl font-semibold text-slate-900">Activer votre licence</h1>
          <p className="mt-2 text-sm text-slate-500">
            {check.ok
              ? "Votre licence est active."
              : REASON_MESSAGES[reason ?? check.reason] ?? REASON_MESSAGES.NONE}
          </p>

          <div className="mt-6">
            <ActivateForm />
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Vous n&apos;avez pas de clé ? Contactez votre établissement ou l&apos;équipe Bee2
            pour en obtenir une.
          </p>

          {check.ok && (
            <p className="mt-4 text-center text-sm">
              <a href="/dashboard" className="font-medium text-amber-600 hover:underline">
                Aller au tableau de bord →
              </a>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
