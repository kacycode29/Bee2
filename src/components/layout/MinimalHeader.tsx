import Link from "next/link";
import { SignOutButton } from "@/components/layout/SignOutButton";

export function MinimalHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-slate-900">
            B
          </span>
          Bee2
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
