import Link from "next/link";
import { LayoutDashboard, BookOpen, FileText, UserCircle, ShieldCheck } from "lucide-react";
import { SignOutButton } from "@/components/layout/SignOutButton";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/library", label: "Bibliothèque", icon: BookOpen },
  { href: "/lesson-plans", label: "Mes fiches", icon: FileText },
  { href: "/account", label: "Mon compte", icon: UserCircle },
];

export function AppShell({
  children,
  isAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-1">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">
        <div className="flex items-center gap-2 px-5 py-5 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-400 text-slate-900">
            B
          </span>
          Bee2
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50"
            >
              <ShieldCheck className="h-4 w-4" />
              Administration
            </Link>
          )}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <SignOutButton />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:hidden">
          <div className="font-semibold">Bee2</div>
          <SignOutButton />
        </header>
        <main className="flex-1 bg-slate-50 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
