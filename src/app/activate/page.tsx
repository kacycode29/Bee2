import { requireUser } from "@/lib/session";
import { getFreshLicenseStatus } from "@/lib/license";
import { Card } from "@/components/ui/Card";
import { ActivateForm } from "@/components/activate/ActivateForm";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import Link from "next/link";

const REASON_MESSAGES: Record<string, string> = {
  NONE: "Votre compte n'a pas encore de licence active.",
  UNUSED: "Cette clé n'a pas encore été activée.",
  REVOKED: "Votre licence a été révoquée. Contactez votre administrateur.",
  EXPIRED: "Votre licence a expiré. Activez une nouvelle clé pour continuer.",
  DEVICE_LIMIT:
    "Le nombre maximal d'appareils autorisés pour votre clé est atteint sur cet appareil. Désactivez un appareil depuis votre compte, puis réessayez votre clé ci-dessous.",
  DEVICE_REVOKED:
    "Cet appareil a été désactivé. Ressaisissez votre clé ci-dessous pour le réactiver.",
  DEVICE_UNKNOWN: "Cet appareil n'a pas encore été identifié. Ressaisissez votre clé ci-dessous.",
};

export default async function ActivatePage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const user = await requireUser();
  const { reason: reasonParam } = await searchParams;
  const { check } = await getFreshLicenseStatus(user.id);

  // A device-related reason can be true even when the license itself is
  // valid (check.ok) — it still needs its own message/CTA, and the
  // "go to dashboard" shortcut must not show, since it would just bounce
  // back here.
  const reason = reasonParam ?? (check.ok ? null : check.reason);
  const isDeviceIssue = reason === "DEVICE_LIMIT" || reason === "DEVICE_REVOKED" || reason === "DEVICE_UNKNOWN";
  const allClear = !reason;

  return (
    <div className="flex flex-1 flex-col">
      <MinimalHeader />
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
        <Card className="w-full max-w-sm">
          <h1 className="text-xl font-semibold text-slate-900">Activer votre licence</h1>
          <p className="mt-2 text-sm text-slate-500">
            {allClear ? "Votre licence est active." : REASON_MESSAGES[reason ?? "NONE"]}
          </p>

          {isDeviceIssue && (
            <p className="mt-3 text-sm">
              <Link href="/account" className="font-medium text-amber-600 hover:underline">
                Gérer mes appareils →
              </Link>
            </p>
          )}

          <div className="mt-6">
            <ActivateForm />
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Vous n&apos;avez pas de clé ? Contactez votre établissement ou l&apos;équipe Bee2
            pour en obtenir une.
          </p>

          {allClear && (
            <p className="mt-4 text-center text-sm">
              <Link href="/dashboard" className="font-medium text-amber-600 hover:underline">
                Aller au tableau de bord →
              </Link>
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
