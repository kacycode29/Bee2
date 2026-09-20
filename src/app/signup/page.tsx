"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

/** Formats free-typed input into XXXXX-XXXXX-XXXXX as the user types. */
function formatLicenseInput(raw: string): string {
  const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15);
  return clean.match(/.{1,5}/g)?.join("-") ?? clean;
}

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [licenseCode, setLicenseCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // React state updates aren't synchronous, so `disabled={loading}` alone
  // leaves a brief window where a fast double click (or double Enter) fires
  // two submits before the button re-renders as disabled. This ref closes
  // that window immediately.
  const submittingRef = useRef(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, licenseCode }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? `Une erreur est survenue (code ${res.status}).`);
        setLoading(false);
        submittingRef.current = false;
        return;
      }

      const signInRes = await signIn("credentials", { username, password, redirect: false });
      if (signInRes?.error) {
        setError(
          "Votre compte a été créé, mais la connexion automatique a échoué. Essayez de vous connecter manuellement."
        );
        setLoading(false);
        submittingRef.current = false;
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(
        "Impossible de contacter le serveur. Vérifiez votre connexion et que le serveur (et sa base de données) sont bien démarrés, puis réessayez."
      );
      setLoading(false);
      submittingRef.current = false;
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
      <Card className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-slate-900">Créer un compte</h1>
        <p className="mt-1 text-sm text-slate-500">
          Une clé d&apos;accès valide est requise pour créer un compte.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="username">Nom d&apos;utilisateur</Label>
            <Input
              id="username"
              required
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9._\-]+"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <p className="mt-1 text-xs text-slate-400">8 caractères minimum.</p>
          </div>
          <div>
            <Label htmlFor="licenseCode">Clé d&apos;accès</Label>
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

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Création..." : "Créer mon compte"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-medium text-amber-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </Card>
    </div>
  );
}
