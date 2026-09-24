"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(
        res.code === "too_many_attempts"
          ? "Trop de tentatives. Réessayez dans quelques minutes."
          : "Nom d'utilisateur ou mot de passe incorrect."
      );
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-16">
      <Card className="w-full max-w-sm">
        <h1 className="text-xl font-semibold text-slate-900">Se connecter</h1>
        <p className="mt-1 text-sm text-slate-500">Accédez à votre espace Bee2.</p>

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
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p className="mt-3 text-center text-sm">
          <Link href="/forgot-password" className="font-medium text-amber-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>

        <p className="mt-3 text-center text-sm text-slate-500">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="font-medium text-amber-600 hover:underline">
            Créer un compte
          </Link>
        </p>
      </Card>
    </div>
  );
}
