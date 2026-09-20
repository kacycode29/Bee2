import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { generateLicenseCode, licenseDurationDays } from "@/lib/license";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import type { LicenseType } from "@prisma/client";

const STATUS_TONE: Record<string, "success" | "warning" | "danger" | "default"> = {
  ACTIVE: "success",
  UNUSED: "warning",
  EXPIRED: "danger",
  REVOKED: "danger",
};

async function generateKeysAction(formData: FormData) {
  "use server";
  await requireAdmin();

  const type = String(formData.get("type") ?? "ANNUAL") as LicenseType;
  const quantity = Math.min(50, Math.max(1, Number(formData.get("quantity") ?? 1)));
  const maxActivations = Math.min(10, Math.max(1, Number(formData.get("maxActivations") ?? 2)));
  const notes = String(formData.get("notes") ?? "").trim() || null;

  const durationDays = licenseDurationDays(type);

  await prisma.licenseKey.createMany({
    data: Array.from({ length: quantity }, () => ({
      code: generateLicenseCode(),
      type,
      maxActivations,
      notes,
      expiresAt:
        type === "TRIAL" && durationDays
          ? new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000)
          : null,
    })),
  });

  revalidatePath("/admin/keys");
}

async function revokeKeyAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  await prisma.licenseKey.update({
    where: { id },
    data: { status: "REVOKED", revokedAt: new Date() },
  });
  await prisma.activation.updateMany({ where: { licenseKeyId: id }, data: { revoked: true } });
  revalidatePath("/admin/keys");
}

async function reactivateKeyAction(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const key = await prisma.licenseKey.findUniqueOrThrow({ where: { id } });
  await prisma.licenseKey.update({
    where: { id },
    data: { status: key.userId ? "ACTIVE" : "UNUSED", revokedAt: null },
  });
  revalidatePath("/admin/keys");
}

export default async function AdminKeysPage() {
  await requireAdmin();
  const keys = await prisma.licenseKey.findMany({
    include: { user: true, _count: { select: { activations: true } } },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Clés de licence</h1>
      <p className="mt-1 text-sm text-slate-500">
        Générez des clés à distribuer aux enseignants. Une clé se lie au premier compte qui
        l&apos;active et à un nombre limité d&apos;appareils.
      </p>

      <Card className="mt-6">
        <form action={generateKeysAction} className="grid gap-4 sm:grid-cols-5">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select id="type" name="type" defaultValue="ANNUAL">
              <option value="TRIAL">Essai (14 jours)</option>
              <option value="ANNUAL">Annuelle</option>
              <option value="LIFETIME">À vie</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity">Quantité</Label>
            <Input id="quantity" name="quantity" type="number" min={1} max={50} defaultValue={1} />
          </div>
          <div>
            <Label htmlFor="maxActivations">Appareils max.</Label>
            <Input
              id="maxActivations"
              name="maxActivations"
              type="number"
              min={1}
              max={10}
              defaultValue={2}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Input id="notes" name="notes" placeholder="ex: Lycée Voltaire, lot 2026" />
          </div>
          <div className="sm:col-span-5">
            <Button type="submit">Générer les clés</Button>
          </div>
        </form>
      </Card>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="py-2 pr-4 font-medium">Code</th>
              <th className="py-2 pr-4 font-medium">Type</th>
              <th className="py-2 pr-4 font-medium">Statut</th>
              <th className="py-2 pr-4 font-medium">Compte</th>
              <th className="py-2 pr-4 font-medium">Appareils</th>
              <th className="py-2 pr-4 font-medium">Expire</th>
              <th className="py-2 pr-4 font-medium">Notes</th>
              <th className="py-2 pr-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id} className="border-b border-slate-100">
                <td className="py-2 pr-4 font-mono text-xs">{k.code}</td>
                <td className="py-2 pr-4">{k.type}</td>
                <td className="py-2 pr-4">
                  <Badge tone={STATUS_TONE[k.status]}>{k.status}</Badge>
                </td>
                <td className="py-2 pr-4">{k.user?.email ?? "—"}</td>
                <td className="py-2 pr-4">
                  {k._count.activations} / {k.maxActivations}
                </td>
                <td className="py-2 pr-4">
                  {k.expiresAt ? new Date(k.expiresAt).toLocaleDateString("fr-FR") : "—"}
                </td>
                <td className="py-2 pr-4 text-slate-500">{k.notes ?? "—"}</td>
                <td className="py-2 pr-4">
                  {k.status === "REVOKED" ? (
                    <form action={reactivateKeyAction}>
                      <input type="hidden" name="id" value={k.id} />
                      <Button type="submit" variant="secondary" size="sm">
                        Réactiver
                      </Button>
                    </form>
                  ) : (
                    <form action={revokeKeyAction}>
                      <input type="hidden" name="id" value={k.id} />
                      <Button type="submit" variant="danger" size="sm">
                        Révoquer
                      </Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
