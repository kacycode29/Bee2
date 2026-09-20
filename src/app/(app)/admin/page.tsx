import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Users, KeyRound, BookOpen, FileText } from "lucide-react";

export default async function AdminDashboardPage() {
  const [users, keys, activeKeys, texts, lessonPlans] = await Promise.all([
    prisma.user.count(),
    prisma.licenseKey.count(),
    prisma.licenseKey.count({ where: { status: "ACTIVE" } }),
    prisma.text.count(),
    prisma.lessonPlan.count(),
  ]);

  const stats = [
    { label: "Enseignants", value: users, icon: Users },
    { label: "Clés actives", value: `${activeKeys} / ${keys}`, icon: KeyRound },
    { label: "Textes", value: texts, icon: BookOpen },
    { label: "Fiches générées", value: lessonPlans, icon: FileText },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Administration</h1>
      <p className="mt-1 text-sm text-slate-500">Vue d&apos;ensemble de la plateforme.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <s.icon className="h-5 w-5 text-amber-500" />
            <p className="mt-3 text-2xl font-semibold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <LinkButton href="/admin/keys" variant="secondary" size="sm">
          Gérer les clés de licence
        </LinkButton>
        <LinkButton href="/admin/users" variant="secondary" size="sm">
          Gérer les enseignants
        </LinkButton>
      </div>
    </div>
  );
}
