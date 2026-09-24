"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

function formatLicenseInput(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
  return clean.match(/.{1,5}/g)?.join("-") ?? clean;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [licenseCode, setLicenseCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, licenseCode, newPassword }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? `Une erreur est survenue (code ${res.status}).`);
        setLoading(false);
        submittingRef.current = false;
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setError("Impossible de contacter le serveur. Réessayez.");
      setLoading(false);
      submittingRef.current = false;
    }
  }

  if (success) {
    return (
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
        <Card className="w-full max-w-sm text-center">
          <h1 className="text-xl font-semibold text-slate-900">Mot de passe mis à jour</h1>
          <p className="mt-2 text-sm text-slate-500">
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
          <Button className="mt-6 w-full" onClick={() => router.push("/login")}>
            Se connecter
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
      <Card className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-slate-900">Mot de passe oublié</h1>
        <p className="mt-1 text-sm text-slate-500">
          Comme il n&apos;y a pas d&apos;adresse e-mail, votre clé d&apos;accès sert de preuve
          d&apos;identité : indiquez la clé exacte liée à votre compte pour choisir un nouveau
          mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
            <Input
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="licenseCode">Votre clé d&apos;accès</Label>
            <Input
              id="licenseCode"
              required
              placeholder="XXXXX-XXXXX-XXXXX"
              maxLength={17}
              value={licenseCode}
              onChange={(e) => setLicenseCode(formatLicenseInput(e.target.value))}
              className="font-mono tracking-wider"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input
              id="newPassword"
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <p className="mt-1 text-xs text-slate-400">8 caractères minimum.</p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Mise à jour..." : "Réinitialiser le mot de passe"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Vous vous souvenez de votre mot de passe ?{" "}
          <Link href="/login" className="font-medium text-amber-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </Card>
    </div>
  );
}
