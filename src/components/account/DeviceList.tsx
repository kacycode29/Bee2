"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Laptop } from "lucide-react";

export type DeviceItem = {
  id: string;
  deviceLabel: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
};

export function DeviceList({ devices }: { devices: DeviceItem[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function revoke(id: string) {
    setPendingId(id);
    await fetch(`/api/devices/${id}`, { method: "DELETE" });
    setPendingId(null);
    router.refresh();
  }

  if (devices.length === 0) {
    return <p className="text-sm text-slate-500">Aucun appareil activé pour le moment.</p>;
  }

  return (
    <ul className="divide-y divide-slate-200">
      {devices.map((d) => (
        <li key={d.id} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Laptop className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900">
                {d.deviceLabel || "Appareil sans nom"}
              </p>
              <p className="text-xs text-slate-500">
                Dernière activité : {new Date(d.lastSeenAt).toLocaleString("fr-FR")}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => revoke(d.id)}
            disabled={pendingId === d.id}
          >
            {pendingId === d.id ? "..." : "Désactiver"}
          </Button>
        </li>
      ))}
    </ul>
  );
}
