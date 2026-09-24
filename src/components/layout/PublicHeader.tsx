import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export function PublicHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-slate-900">
            B
          </span>
          Bee2
        </Link>
        <nav className="flex items-center gap-3">
          <LinkButton href="/login" variant="ghost" size="sm">
            Se connecter
          </LinkButton>
          <LinkButton href="/signup" variant="primary" size="sm">
            Créer un compte
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
