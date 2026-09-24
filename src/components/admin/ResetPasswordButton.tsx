"use client";

import { useActionState } from "react";
import { resetUserPasswordAction, type ResetPasswordState } from "@/app/(app)/admin/users/actions";
import { Button } from "@/components/ui/Button";

export function ResetPasswordButton({ userId }: { userId: string }) {
  const [state, formAction, pending] = useActionState<ResetPasswordState, FormData>(
    resetUserPasswordAction,
    null
  );

  if (state && "tempPassword" in state) {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-xs text-amber-800">
        Mot de passe temporaire pour @{state.username} :{" "}
        <span className="font-mono font-semibold">{state.tempPassword}</span>
        <br />
        À communiquer à l&apos;enseignant(e) — il/elle pourra le changer après connexion.
      </div>
    );
  }

  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="id" value={userId} />
      <Button type="submit" variant="ghost" size="sm" disabled={pending}>
        {pending ? "..." : "Réinitialiser le mot de passe"}
      </Button>
      {state && "error" in state && <p className="text-xs text-red-600">{state.error}</p>}
    </form>
  );
}
