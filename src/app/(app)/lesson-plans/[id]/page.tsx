import { notFound } from "next/navigation";
import Link from "next/link";
import { requireActiveLicense } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Download } from "lucide-react";
import type { ActivityStep } from "@/lib/text-engine";
import type { VocabCandidate } from "@/lib/text-engine";

export default async function LessonPlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireActiveLicense();
  const { id } = await params;

  const plan = await prisma.lessonPlan.findUnique({
    where: { id },
    include: { text: true },
  });
  if (!plan || plan.createdById !== user.id) notFound();

  const activities = plan.activities as unknown as ActivityStep[];
  const vocabulary = plan.vocabulary as unknown as VocabCandidate[];

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="success">{plan.level}</Badge>
            <Badge>{plan.durationMin} min</Badge>
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900">{plan.title}</h1>
          <Link
            href={`/library/${plan.textId}`}
            className="mt-1 inline-block text-sm text-amber-600 hover:underline"
          >
            Voir le texte source : {plan.text.title}
          </Link>
        </div>
        <LinkButton href={`/api/lesson-plans/${plan.id}/pdf`} variant="secondary" size="sm">
          <Download className="h-4 w-4" />
          Export PDF
        </LinkButton>
      </div>

      <Card>
        <h2 className="font-semibold text-slate-900">Objectifs</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {plan.objectives.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-900">Mise en route</h2>
        <p className="mt-3 text-sm text-slate-700">{plan.warmup}</p>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-900">Vocabulaire ciblé</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {vocabulary.map((v) => (
            <li key={v.word}>
              <span className="font-medium text-slate-900">{v.word}</span>
              <span className="text-slate-500"> — « {v.sentence} »</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-900">Déroulé de la séance</h2>
        <ol className="mt-3 space-y-4">
          {activities.map((a, i) => (
            <li key={i} className="border-l-2 border-amber-400 pl-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-slate-900">{a.title}</h3>
                <Badge>{a.minutes} min</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{a.description}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <h2 className="font-semibold text-slate-900">Évaluation</h2>
        <p className="mt-3 text-sm text-slate-700">{plan.assessment}</p>
      </Card>
    </div>
  );
}
