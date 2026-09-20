"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/** Formats free-typed input into XXXXX-XXXXX-XXXXX as the user types. */
function formatLicenseInput(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
  return clean.match(/.{1,5}/g)?.join("-") ?? clean;
}

export function ActivateForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Impossible d'activer cette clé.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="code">Clé de licence</Label>
        <Input
          id="code"
          required
          placeholder="XXXXX-XXXXX-XXXXX"
          value={code}
          maxLength={17}
          onChange={(e) => setCode(formatLicenseInput(e.target.value))}
          className="font-mono tracking-wider"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Activation..." : "Activer"}
      </Button>
    </form>
  );
}
