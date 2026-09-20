import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getFreshLicenseStatus } from "@/lib/license";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { DeviceList } from "@/components/account/DeviceList";

const STATUS_TONE: Record<string, "success" | "warning" | "danger" | "default"> = {
  ACTIVE: "success",
  UNUSED: "warning",
  EXPIRED: "danger",
  REVOKED: "danger",
  NONE: "default",
};

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active",
  UNUSED: "Non activée",
  EXPIRED: "Expirée",
  REVOKED: "Révoquée",
  NONE: "Aucune licence",
};

export default async function AccountPage() {
  const user = await requireUser();
  const { status, license } = await getFreshLicenseStatus(user.id);

  const activations = license
    ? await prisma.activation.findMany({
        where: { licenseKeyId: license.id, userId: user.id, revoked: false },
        orderBy: { lastSeenAt: "desc" },
      })
    : [];

  return (
    <div className="flex flex-1 flex-col">
      <MinimalHeader />
      <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Mon compte</h1>
        <p className="mt-1 text-sm text-slate-500">{user.email}</p>

        <Card className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Licence</h2>
            <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
          </div>

          {license ? (
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Type</dt>
                <dd className="font-medium text-slate-900">{license.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Clé</dt>
                <dd className="font-mono text-slate-900">{license.code}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Expire le</dt>
                <dd className="font-medium text-slate-900">
                  {license.expiresAt
                    ? new Date(license.expiresAt).toLocaleDateString("fr-FR")
                    : "Jamais (licence à vie)"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Appareils</dt>
                <dd className="font-medium text-slate-900">
                  {activations.length} / {license.maxActivations}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              Aucune clé n&apos;est associée à ce compte.
            </p>
          )}

          <div className="mt-5">
            <LinkButton href="/activate" variant="secondary" size="sm">
              {license ? "Activer une autre clé" : "Activer ma licence"}
            </LinkButton>
          </div>
        </Card>

        {license && (
          <Card className="mt-6">
            <h2 className="font-semibold text-slate-900">Appareils activés</h2>
            <p className="mt-1 text-sm text-slate-500">
              Désactivez un appareil que vous n&apos;utilisez plus pour libérer une place.
            </p>
            <div className="mt-4">
              <DeviceList
                devices={activations.map((a) => ({
                  id: a.id,
                  deviceLabel: a.deviceLabel,
                  ipAddress: a.ipAddress,
                  userAgent: a.userAgent,
                  firstSeenAt: a.firstSeenAt.toISOString(),
                  lastSeenAt: a.lastSeenAt.toISOString(),
                }))}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
