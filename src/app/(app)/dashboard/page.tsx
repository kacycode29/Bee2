import Link from "next/link";
import { requireActiveLicense } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { ENUM_TO_CLASS_LEVEL } from "@/lib/lesson-plans";
import { BookOpen, FileText, Plus } from "lucide-react";

export default async function DashboardPage() {
  const user = await requireActiveLicense();

  const [textCount, recentPlans, levelCounts] = await Promise.all([
    prisma.text.count({ where: { isPublished: true } }),
    prisma.lessonPlan.findMany({
      where: { createdById: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.text.groupBy({ by: ["level"], _count: true, where: { isPublished: true } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">
        Bonjour {user.username} 👋
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Voici un aperçu de votre espace Bee2.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <BookOpen className="h-5 w-5 text-amber-500" />
          <p className="mt-3 text-2xl font-semibold text-slate-900">{textCount}</p>
          <p className="text-sm text-slate-500">Textes dans la bibliothèque</p>
        </Card>
        <Card>
          <FileText className="h-5 w-5 text-amber-500" />
          <p className="mt-3 text-2xl font-semibold text-slate-900">{recentPlans.length}</p>
          <p className="text-sm text-slate-500">Fiches générées récemment</p>
        </Card>
        <Card className="flex flex-col justify-between">
          <div>
            <p className="font-semibold text-slate-900">Niveaux disponibles</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {levelCounts.map((l) => (
                <Badge key={l.level}>
                  {l.level} · {l._count}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-8 flex gap-3">
        <LinkButton href="/library" size="sm">
          <BookOpen className="h-4 w-4" />
          Parcourir la bibliothèque
        </LinkButton>
        <LinkButton href="/library/new" variant="secondary" size="sm">
          <Plus className="h-4 w-4" />
          Importer un texte
        </LinkButton>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Fiches récentes</h2>
          <Link href="/lesson-plans" className="text-sm font-medium text-amber-600 hover:underline">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {recentPlans.map((plan) => (
            <Link key={plan.id} href={`/lesson-plans/${plan.id}`}>
              <Card className="flex items-center justify-between transition-shadow hover:shadow-md">
                <div>
                  <h3 className="font-medium text-slate-900">{plan.sessionTitle}</h3>
                  <p className="text-sm text-slate-500">
                    Unité {plan.unitNumber} — {plan.unitTitle}
                  </p>
                </div>
                <Badge>{ENUM_TO_CLASS_LEVEL[plan.classLevel]}</Badge>
              </Card>
            </Link>
          ))}
          {recentPlans.length === 0 && (
            <Card className="text-center text-sm text-slate-500">
              Aucune fiche pour le moment. Générez-en une depuis la bibliothèque.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
