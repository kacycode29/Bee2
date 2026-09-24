"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function BuyButton({ plan, label }: { plan: "ANNUAL" | "LIFETIME"; label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) {
        setError(data.error ?? "Impossible de démarrer le paiement.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Impossible de contacter le serveur.");
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={handleClick} disabled={loading} className="w-full">
        {loading ? "Redirection..." : label}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
