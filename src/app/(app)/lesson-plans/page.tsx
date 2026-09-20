import Link from "next/link";
import { requireActiveLicense } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { FileText } from "lucide-react";

export default async function LessonPlansPage() {
  const user = await requireActiveLicense();

  const plans = await prisma.lessonPlan.findMany({
    where: { createdById: user.id },
    include: { text: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Mes fiches de leçon</h1>
          <p className="mt-1 text-sm text-slate-500">
            {plans.length} fiche{plans.length > 1 ? "s" : ""} générée
            {plans.length > 1 ? "s" : ""}.
          </p>
        </div>
        <LinkButton href="/library" size="sm">
          Parcourir la bibliothèque
        </LinkButton>
      </div>

      <div className="mt-6 space-y-3">
        {plans.map((plan) => (
          <Link key={plan.id} href={`/lesson-plans/${plan.id}`}>
            <Card className="flex items-center justify-between transition-shadow hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{plan.title}</h3>
                  <p className="text-sm text-slate-500">
                    D&apos;après « {plan.text.title} » · {plan.durationMin} min
                  </p>
                </div>
              </div>
              <Badge>{plan.level}</Badge>
            </Card>
          </Link>
        ))}
      </div>

      {plans.length === 0 && (
        <Card className="mt-6 text-center text-sm text-slate-500">
          Vous n&apos;avez pas encore généré de fiche. Rendez-vous dans la{" "}
          <Link href="/library" className="font-medium text-amber-600 hover:underline">
            bibliothèque
          </Link>{" "}
          pour en créer une.
        </Card>
      )}
    </div>
  );
}
